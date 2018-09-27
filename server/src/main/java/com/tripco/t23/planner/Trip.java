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
        this.distances = legDistances();
        this.map = svg();
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

        String s = "M ";
        for(Place p: places){
            s+= getX(p.longitude) + " " + getY(p.latitude) + " L ";
        }
        s += getX(places.get(0).longitude) + " " + getY(places.get(0).latitude);


        String svg = strBuild.insert(background.lastIndexOf("/>")+2,
                "\n\n\t\t\t<path\n\td=\""+s+"\"\n\tstyle=\"fill:none;fill-rule:"
                        + "evenodd;stroke:#f4426b;stroke-width:1.27559996;stroke-linejoin:"
                        + "round;stroke-miterlimit:3.8636899\" \n\tid=\"tripLegs\" />").toString();
        return svg;
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
     * @return ArrayList<Integer> that will contain distances between each city
     */

    private ArrayList<Integer> legDistances() {

        ArrayList<Integer> distances = new ArrayList<Integer>();

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


            LegDistances legdist; // this class communicates between Trip and Distance

            if (options.units.equals("user defined")){
                // pass info to LegDistances.java then to Distance.java
                legdist = new LegDistances(p1, p2, options.units, options.unitRadius);
            } else { // miles, km or nautical miles
                legdist = new LegDistances(p1, p2, options.units);
            }

            distCalc = legdist.distanceBetween(); // calculates distance between two places

            distances.add(distCalc); // add to arraylist of distances
        }
        return distances;
    }

}
