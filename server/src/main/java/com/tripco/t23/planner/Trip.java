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
        this.map = (options.map=="svg") ? svg() : kml();
        noneDistances();
    }

    /**
     * Returns an SVG containing the background and the legs of the trip.
     * @return String that contains SVG
     */
    private String kml() {

        String line;
        StringBuilder strBuild = new StringBuilder();

        try {
            BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(
                            getClass().getClassLoader().getResourceAsStream("mapbase.kml"),
                            Charset.defaultCharset()));
            while ((line = bufferedReader.readLine()) != null) {
                strBuild.append(line+'\n');
            }
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
        }
        System.out.println(strBuild.toString());

        String background = strBuild.toString();
        String name = "<name>" + title + "</name>";
        String locations = name;

        for(Place p: places){
            locations +=
                    "\t<Placemark>\n" +
                    "\t\t<name>"+p.name+"</name>\n" +
                    "\t\t<styleUrl>#icon-1899-0288D1-nodesc</styleUrl>\n" +
                    "\t\t<Point>\n" +
                    "\t\t\t<coordinates>\n" +
                    "\t\t\t\t" + p.longitude+"," + p.latitude +
                    ",0\n\t\t\t</coordinates>\n" +
                    "\t\t</Point>\n" +
                    "\t</Placemark>\n";
        }
        for(int i = 0 ; i<places.size(); i++){
            locations +=
                    "\t<Placemark>\n" +
                    "\t\t<name>Line 8</name>\n" +
                    "\t\t<styleUrl>#line-000000-1200-nodesc</styleUrl>\n" +
                    "\t\t<LineString>\n" +
                    "\t\t\t<tessellate>1</tessellate>\n" +
                    "\t\t\t<coordinates>\n" +
                    "\t\t\t\t" + places[i].longitude + "," + places[i].latitude + ",0\n" +
                    "\t\t\t\t" + places[(i+1)%places.size()-1].longitude + "," + places[(i+2)%places.size()-1].latitude + ",0\n" +" +
                    "\t\t\t</coordinates>\n" +
                    "\t\t</LineString>\n" +
                    "\t</Placemark>"
        }

        strBuild.insert(background.indexOf("<Document>")+10, '\n'+name);
        return strBuild.insert(strBuild.toString().indexOf("<Folder>")+8, locations).toString();
    }

    private String svg() {

        String line;
        StringBuilder strBuild = new StringBuilder();

        try {
            BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(
                            getClass().getClassLoader().getResourceAsStream("worldmap.svg"),
                            Charset.defaultCharset()));
            while ((line = bufferedReader.readLine()) != null) {
                strBuild.append(line+'\n');
            }
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
        }

        String background = strBuild.toString();
        String locations ="";
        int i = 1;
        for(Place p: places){
            locations += "\n\n\t\t\t<circle cx=\"" + getX(p.longitude)
                    + "\" cy=\"" + getY(p.latitude)
                    + "\" r=\"6\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />";
            i++;
        }

        String path = "M ";
        for(Place p: places){
            path+= getX(p.longitude) + " " + getY(p.latitude) + " L ";
        }

        path += getX(places.get(0).longitude) + " " + getY(places.get(0).latitude);


        return strBuild.insert(background.lastIndexOf("/>")+2,
                "\n\n\t\t\t<path\n\td=\"" + path + "\"\n\tstyle=\"fill:none;fill-rule:"
                        + "evenodd;stroke:#f4426b;stroke-width:4;stroke-linejoin:"
                        + "round;stroke-miterlimit:3.8636899\" \n\tid=\"tripLegs\" />"
                        + locations).toString();
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
