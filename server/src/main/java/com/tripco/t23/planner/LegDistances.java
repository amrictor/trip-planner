package com.tripco.t23.planner;

import java.util.ArrayList;

public class LegDistances {

    // create two private variables for Distance and Trip
    private Distance distanceClass = new Distance();
    Place p1;
    Place p2;
    String measure;
    double rad;

    // create constructor for LegDistances
    LegDistances(Place place1, Place place2, String units){ // default unit options
        // get places from trip class to calc distance

        p1 = place1;
        p2 = place2;
        measure = units;
        rad = 0.0;
    }

    LegDistances(Place place1, Place place2, String units, double radius){ // for when users want to give their own units
        p1 = place1;
        p2 = place2;
        measure = units;
        rad = radius;
    }

    int distanceBetween(){
        int dist = -1; // make sure that we are properly calculating distance

        // pass the places and units from Trip to Distance
        distanceClass.setOrigin(p1);
        distanceClass.setDestination(p2);
        distanceClass.setUnits(measure);
        distanceClass.setUnitRadius(rad);

        distanceClass.calculate();

        dist = distanceClass.getDistance();

        return dist;
    }

}
