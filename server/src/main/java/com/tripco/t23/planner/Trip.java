package com.tripco.t23.planner;

import java.io.*;
import java.io.BufferedReader;
import java.nio.charset.Charset;
import java.util.ArrayList;


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
     * Adds the map and distances for the places and optimizes trip as indicated by user.
     */
    public void plan() {
        if(options.optimization != null){
            if(options.optimization.equals("short")){
                shortDistances(0);
            }
            if(options.optimization.equals("shorter")){
                shortDistances(2);
            }
            if(options.optimization.equals("shortest")){
                shortDistances(3);
            }
        }
        if(options.map != null){
            if(options.map.equals("kml")){
                this.map = kml();
            }
            else{
                this.map = svg();
            }
        }
        else{
            this.map = svg();
        }
        noneDistances();
    }

    /**
     * Returns a StringBuilder containing the contents of a passed in file.
     * @return StringBuilder that contains file contents
     */
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
     * Returns a KML containing the legs of the trip.
     * @return String that contains KML
     */
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

    /**
     * Returns a KML placemark component.
     * @return String that contains placemark component
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

    /**
     * Returns an SVG containing the background and the legs of the trip.
     * @return String that contains SVG
     */
    private String svg() {
        StringBuilder path = new StringBuilder();

        for(int i = 0; i<=places.size(); i++){
            Place first = places.get(((i-1) % places.size() + places.size()) % places.size());
            Place second = places.get(i % places.size());

            if((first.longitude-second.longitude)>180.0) { //wrap around at right side
                path.append("\n\n\t\t\t")
                        .append(line(first, second, -1))
                        .append("\n\n\t\t\t")
                        .append(line(first, second, 1));
            }
            else if((first.longitude-second.longitude)<-180.0) { //wrap around at left side
                path.append("\n\n\t\t\t")
                        .append(line(second, first, -1))
                        .append("\n\n\t\t\t")
                        .append(line(second, first, 1));
            }
            else {
                path.append("\n\n\t\t\t")
                        .append(line(first, second, 0)); //no wrap
            }

            path.append(point(first));
        }

        StringBuilder strBuild = readFile("worldmap.svg");
        
        return strBuild.insert(strBuild.lastIndexOf("/>")+2,
                path.toString() + "\n").toString();
    }

    /**
     * Returns an SVG line component.
     * @return String that contains line component
     */
    private String line(Place placeA, Place placeB, int wrap) {
        double longA = placeA.longitude;
        longA += (wrap < 0) ? -360.0 : 0;
        double longB = placeB.longitude;
        longB += (wrap > 0) ? 360.0 : 0;

        return "<line x1=\"" + getX(longA) + "\" y1=\"" + getY(placeA.latitude)
                + "\" x2=\"" + getX(longB) + "\" y2=\"" + getY(placeB.latitude)
                + "\" stroke=\"red\" stroke-width=\"3\"/>";
    }

    /**
     * Returns an SVG circle component.
     * @return String that contains circle component
     */
    private String point(Place place) {
        return "\n\n\t\t\t<circle cx=\""
                + getX(place.longitude)
                + "\" cy=\""
                + getY(place.latitude)
                + "\" r=\"6\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />";
    }

    /**
     * Returns the pixel conversion from location longitude.
     * @return double X coordinate
     */
    private double getX(double longitude){
        return 800 * (longitude+180.0) / 360.0;
    }

    /**
     * Returns the pixel conversion from location latitude.
     * @return double Y coordinate
     */
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
            TripOpt temp = new TripOpt(places, options.units,null, opt);
            temp.shortOptimization();
            this.places = temp.getPlaces();
        }
    }
}
