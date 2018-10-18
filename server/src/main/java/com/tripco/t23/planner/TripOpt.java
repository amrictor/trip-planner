package com.tripco.t23.planner;

import java.util.ArrayList;

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
    public ArrayList<Place> getPlaces() { return places; }
    public ArrayList<Integer> getDistances() { return distances; }

    /**
     * Sends each town to retrieve it's nearest neighbor
     */
    public void shortOptimization(){
        System.out.println(places.size());
        for(int i = 0; i < places.size(); i++){
            nearestNeighbor(places.get(i));
        }
        places = tempPlaces;
    }

    /**
     * Makes the nearest neighbor for the base town its sent
     */
    private void nearestNeighbor(Place base){
        ArrayList<Place> used = new ArrayList<>();
        ArrayList<Place> unused = new ArrayList<>(places);
        Place place;
        int cumulativeDist = 0;

        unused.remove(base);
        used.add(base);
        while(unused.size() > 0){
            place = getNextCity(used.get(used.size()-1),unused);
            used.add(place);
            unused.remove(place);
            cumulativeDist = cumulativeDist + shortestdist;
        }
        if(cumulativeDist < currentShortest){
            tempPlaces = used;
            currentShortest = cumulativeDist;
        }
    }

    /**
     * Finds the next city in the set for the current base town
     */
    private Place getNextCity(Place base, ArrayList<Place> set){
        Place result = set.get(0);
        shortestdist = measure(base, set.get(0));
        for(int i = 0; i < set.size(); i++){
            int temp = measure(base,set.get(i));
            if(temp < shortestdist){
                shortestdist = temp;
                result = set.get(i);
            }
        }
        return result;
    }

    /**
     * Actually measures the distances
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
