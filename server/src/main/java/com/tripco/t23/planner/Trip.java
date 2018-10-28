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
    public ArrayList<Place> places;
    public Option options;
    public ArrayList<Integer> distances;
    public String map;

    /** The top level method that does planning.
     * At this point it just adds the map and distances for the places in order.
     * It might need to reorder the places in the future.
     */
    public void plan() {
        if(options.optimization != null){
            if(options.optimization.equals("short")){
                shortDistances();
            }
        }
        this.map = svg();
        noneDistances();
    }

    /**
     * Returns an SVG containing the background and the legs of the trip.
     * @return String that contains SVG
     */

    private String svg() {

        String line = null;
        StringBuilder strBuild = new StringBuilder();

        try {
            BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(getClass().getClassLoader().getResourceAsStream("colorado.svg"),
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

            locations += "\n\n\t\t\t<text x=\"" + (getX(p.longitude) + 5)
                    + "\" y=\"" + (getY(p.latitude) - 5)
                    + "\" font-family=\"sans-serif\" font-size=\"40px\" fill=\"black\">" + i + "</text>";
            i++;
        }

        String path = "M ";
        for(Place p: places){
            path+= getX(p.longitude) + " " + getY(p.latitude) + " L ";
        }

        path += getX(places.get(0).longitude) + " " + getY(places.get(0).latitude);


        String svg = strBuild.insert(background.lastIndexOf("/>")+2,
                "\n\n\t\t\t<path\n\td=\"" + path + "\"\n\tstyle=\"fill:none;fill-rule:"
                        + "evenodd;stroke:#f4426b;stroke-width:4;stroke-linejoin:"
                        + "round;stroke-miterlimit:3.8636899\" \n\tid=\"tripLegs\" />"
                        + locations).toString();

        return "data:image/svg+xml;utf8," + svg;
    }

    private double getX(double longitude){
        return Math.abs(109.3-Math.abs(longitude)) * 142.2143;
    }

    private double getY(double latitude){
        return Math.abs(41.2-latitude) * 177.9733;
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

    private void shortDistances(){
        if(options.units.equals("user defined")){
            TripOpt temp = new TripOpt(places, options.units,options.unitRadius);
            temp.shortOptimization();
            this.places = temp.getPlaces();
        }
        else{
            TripOpt temp = new TripOpt(places, options.units);
            temp.shortOptimization();
            this.places = temp.getPlaces();
        }
    }
}