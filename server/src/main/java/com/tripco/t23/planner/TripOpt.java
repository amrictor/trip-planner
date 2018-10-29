package com.tripco.t23.planner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;

/**
 * This class handles the optimization requests, changing both places and distances.
 */
public class TripOpt {
    private ArrayList<Place> places = new ArrayList<>();
    private ArrayList<Integer> distances = new ArrayList<>();
    private String units;
    private Double unitRadius;
    private ArrayList<Place> tempPlaces = new ArrayList<>();
    private int currentShortest;
    private int shortestdist;

    //Constructor
    TripOpt(ArrayList<Place> places, String units){
        this.places = places;
        this.units = units;
        currentShortest = Integer.MAX_VALUE;
    }

    TripOpt(ArrayList<Place> places, String units, Double unitRadius){
        this.places = places;
        this.units = units;
        this.unitRadius = unitRadius;
        currentShortest = Integer.MAX_VALUE;
    }

    //Getters
    public ArrayList<Place> getPlaces() {
        return places;
    }

    /**
     * Sends each town to retrieve it's nearest neighbor.
     */
    public void shortOptimization(){
        for(int i = 0; i < places.size(); i++){
            nearestNeighbor(places.get(i));
        }
        places = tempPlaces;
    }

    /**
     * Makes the nearest neighbor for the base town its sent.
     */
    private void nearestNeighbor(Place base){
        LinkedList<Place> used = new LinkedList<>();
        boolean[] unused = new boolean[places.size()];
        int place;
        int cumulativeDist = 0;

        unused[places.indexOf(base)] = true;
        used.add(base);
        System.out.println(Arrays.toString(unused));
        while(used.size() != places.size()){
            place = getNextCity(used.get(used.size()-1),unused);
            used.add(places.get(place));
            unused[place] = true;
            cumulativeDist = cumulativeDist + shortestdist;
        }
        if(cumulativeDist < currentShortest){
            tempPlaces.addAll(used);
            currentShortest = cumulativeDist;
        }
    }

    /**
     * Finds the next city in the set for the current base town.
     */
    private int getNextCity(Place base, boolean[] set){
        shortestdist = Integer.MAX_VALUE;
        int temp;
        int result = 0;
        for(int i = 0; i < places.size(); i++){
            if(!set[i]) {
                temp = measure(base, places.get(i));
            }
            else{
                continue;
            }
            if(temp < shortestdist){
                shortestdist = temp;
                result = i;
            }
        }
        return result;
    }

    /**
     * Actually measures the distances.
     */
    private int measure(Place p1, Place p2){
        Distance temp;
        if(units.equals("user defined")){
            temp = new Distance(p1,p2,units,unitRadius);
        }
        else{
            temp = new Distance(p1,p2,units);
        }
        temp.calculate();
        return temp.getDistance();
    }
}

