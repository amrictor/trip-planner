package com.tripco.t23.planner;

import com.google.gson.Gson;
import java.lang.Math;

public class Distance {
    //TFFI variables
    //Initialized to distance
    private String type;
    private int version;

    private Place origin;
    private Place destination;
    private String units;
    private String unitName;
    private int unitRadius;

    //Result variable.
    private int distance;

    //Getters.
    public Place getOrigin() {
        return origin;
    }
    public Place getDestination(){
        return destination;
    }
    public String getUnits(){
        return units;
    }
    public String getUnitName(){
        return unitName;
    }
    public int getUnitRadius() {
        return unitRadius;
    }
    public int getDistance() {
        return distance;
    }
    public int getVersion() {
        return version;
    }
    public String getType() {
        return type;
    }

    //Setters.
    public void setDestination(Place destination) {
        this.destination = destination;
    }
    public void setOrigin(Place origin) {
        this.origin = origin;
    }
    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }
    public void setUnitRadius(int unitRadius) {
        this.unitRadius = unitRadius;
    }
    public void setUnits(String units) {
        this.units = units;
    }

    //Function for the actual calculation
    public void calculate(){
        //Angles converted to radians
        double lat1 = Math.toRadians(Double.parseDouble(origin.latitude));
        double log1 = Math.toRadians(Double.parseDouble(origin.longitude));
        double lat2 = Math.toRadians(Double.parseDouble(destination.latitude));
        double log2 = Math.toRadians(Double.parseDouble(destination.longitude));
        //double difLat = Math.abs(lat1 - lat2);
        double difLog = Math.abs(log1 - log2);

        //Equation attempt
        double numerator1 = Math.pow(Math.cos(lat2) * Math.sin(difLog), 2);
        double numerator2 = Math.pow(Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(difLog),2);
        double denominator = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(difLog);
        double temp = Math.atan2(Math.sqrt(numerator1 + numerator2),denominator);
        if (units.equals("miles")){
            distance = (int) Math.round(temp * 3959);
        }
        else if(units.equals("kilometers")) 
        {
            distance = (int) Math.round(temp * 6371);
        }
        else if(units.equals("nautical miles"))
        {
            distance = (int) Math.round(temp * 3440);
        }
        else
        {
            distance = (int) Math.round(temp * unitRadius);
        }
    }
}
