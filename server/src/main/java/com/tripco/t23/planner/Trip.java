package com.tripco.t23.planner;
/*
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t23.server.HTTP;
import groovy.ui.SystemOutputInterceptor;
import org.codehaus.jettison.json.JSONObject;
import spark.Request;*/

import com.sun.org.apache.bcel.internal.util.ClassLoader;

import java.io.*;
import java.io.BufferedReader;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.util.Scanner;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 *
 */
public class Trip {
    // The variables in this class should reflect TFFI.
    public Short version;
    public String type;
    public String title;
    public Option options;
    public ArrayList<Place> places;
    public ArrayList<Integer> distances;
    public String map;

    /** The top level method that does planning.
     * At this point it just adds the map and distances for the places in order.
     * It might need to reorder the places in the future.
     */
    public void plan() {
        if(options.optimization != null){
            if(options.optimization.equals("short")){
                shortDistances(0);
            }
            if(options.optimization.equals("shorter")){
                shortDistances(2);
            }
        }
        this.map = options.map.equals("svg") ? svg() : kml();
        if(options.map != null){
            if(options.map.equals("svg")){
                this.map = "svg";
            }
            if(options.map.equals("kml")){
                this.map = "kml";
            }
        }
        else{
            this.map = "svg";
        }
        noneDistances();
    }

    private StringBuilder readFile(String filename) {
        String line;
        StringBuilder strBuild = new StringBuilder();
        try {
            BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(getClass().getClassLoader().getResourceAsStream(filename),
                            Charset.defaultCharset()));
            while ((line = bufferedReader.readLine()) != null) {
                strBuild.append(line).append('\n');
            }
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
        }
        return strBuild;
    }

    /**
     * Returns an SVG containing the background and the legs of the trip.
     * @return String that contains SVG
     */
    private String placemarkBlock(String name, String type, String coordinates){
        return "\t<Placemark>\n"
                + "\t\t<name>"
                + name
                + "</name>\n"
                + (type.equals("Point")
                        ? "\t\t<styleUrl>#icon-1899-0288D1-nodesc</styleUrl>\n"
                        : "\t\t<styleUrl>#line-000000-1200-nodesc</styleUrl>\n")
                + "\t\t<" + type + ">\n"
                + (type.equals("LineString")
                        ? "\t\t\t<tessellate>1</tessellate>\n"
                        : "")
                + "\t\t\t<coordinates>\n" + coordinates +"\t\t\t</coordinates>\n"
                + "\t\t</" + type + ">\n"
                + "\t</Placemark>\n";

    }
    
    private String kml() {
        StringBuilder strBuild = readFile("mapbase.kml");

        String name = "<name>" + title + "</name>";
        StringBuilder locations = new StringBuilder(name);

        for(Place p: places){
            String coordinates = "\t\t\t\t" + p.longitude + "," + p.latitude +",0\n";
            locations.append(placemarkBlock(p.name, "Point", coordinates));
        }
        for(int i = 0 ; i<places.size(); i++){
            String coordinates =
                    "\t\t\t\t" + places.get(i).longitude + "," + places.get(i).latitude + ",0\n" 
                    + "\t\t\t\t" + places.get(((i+1)%places.size())).longitude + "," 
                    + places.get((i+1)%places.size()).latitude + ",0\n";
            String lineName = places.get(i).name + " to " + places.get((i+1)%places.size()).name;
            locations.append(placemarkBlock(lineName, "LineString", coordinates));
        }
        strBuild.insert(strBuild.indexOf("<Document>")+10, "\n\t"+name);
        return strBuild.insert(strBuild.indexOf("<Folder>")+8, locations).toString();
    }

    private String svg() {
        
        StringBuilder locations = new StringBuilder();
        for(Place p: places){
            locations.append("\n\n\t\t\t<circle cx=\"")
                    .append(getX(p.longitude))
                    .append("\" cy=\"")
                    .append(getY(p.latitude))
                    .append("\" r=\"6\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />");
        }

        StringBuilder path = new StringBuilder("M ");
        for(Place p: places){
            path.append(getX(p.longitude))
                .append(" ")
                .append(getY(p.latitude))
                .append(" L ");
        }

        path.append(getX(places.get(0).longitude))
            .append(" ")
            .append(getY(places.get(0).latitude));

        StringBuilder strBuild = readFile("worldmap.svg");
        
        return strBuild.insert(strBuild.lastIndexOf("/>")+2,
                "\n\n\t\t\t<path\n\td=\"" + path.toString() + "\"\n\tstyle=\"fill:none;fill-rule:"
                        + "evenodd;stroke:#f4426b;stroke-width:4;stroke-linejoin:"
                        + "round;stroke-miterlimit:3.8636899\" \n\tid=\"tripLegs\" />"
                        + locations.toString()).toString();
    }

    private double getX(double longitude){
        return 800 * (longitude+180.0) / 360.0;
    }

    private double getY(double latitude){
        return 400 * (180.0-(latitude + 90.0)) / 180.0;
    }
    /**
     * Returns the distances between consecutive places,
     * including the return to the starting point to make a round trip.
     */

    private void noneDistances() {

        ArrayList<Integer> distances = new ArrayList<>();

        for (int i = 0; i < places.size(); i++){
            int distCalc = -1; // set default val so we know when no work
            Place p1; // start place
            Place p2; // end place
            if (i == places.size() - 1){ // last new place so wrap around and go back to origin
                p1 = places.get(i);
                p2 = places.get(0); // where we started originally

            }
            else { // not the last place we visit
                p1 = places.get(i); // start place
                p2 = places.get(i+1); // end place
            }


            Distance dist; //
            if (options.units.equals("user defined")){
                // pass info to Distance.java
                dist = new Distance(p1, p2, options.units, options.unitRadius);
            } else { // miles, km or nautical miles
                dist = new Distance(p1, p2, options.units);
            }

            dist.calculate(); //Calculates distance
            distCalc = dist.getDistance(); // Retrieves calculated distance from Distance

            distances.add(distCalc); // add to arraylist of distances
        }
        this.distances = distances;
    }

    private void shortDistances(int opt){
        if(options.units.equals("user defined")){
            TripOpt temp = new TripOpt(places, options.units,options.unitRadius, opt);
            temp.shortOptimization();
            this.places = temp.getPlaces();
        }
        else{
            TripOpt temp = new TripOpt(places, options.units, opt);
            temp.shortOptimization();
            this.places = temp.getPlaces();
        }
    }
}
