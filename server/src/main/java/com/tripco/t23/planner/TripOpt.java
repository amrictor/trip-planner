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
    private Place[] tempPlaces;
    private int[][] allDistances;
    private int currentShortest;
    private int shortestdist;

    //Constructor
    TripOpt(ArrayList<Place> places, String units){
        this.places = places;
        this.units = units;
        currentShortest = Integer.MAX_VALUE;
        allDistances = new int[places.size()][places.size()];
        for(int i = 0; i < places.size();i++){
            for(int j = 0; j < places.size();j++){
                allDistances[i][j] = measure(places.get(i),places.get(j));
            }
        }
    }

    TripOpt(ArrayList<Place> places, String units, Double unitRadius){
        this.places = places;
        this.units = units;
        this.unitRadius = unitRadius;
        currentShortest = Integer.MAX_VALUE;
        allDistances = new int[places.size()][places.size()];
        for(int i = 0; i < places.size()-1;i++){
            for(int j = 0; j < places.size()-1;i++){
                allDistances[i][j] = measure(places.get(i),places.get(j));
            }
        }
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
            nearestNeighbor(i);
        }
       places = new ArrayList<>(Arrays.asList(tempPlaces));
    }

    /**
     * Makes the nearest neighbor for the base town its sent.
     */
    private void nearestNeighbor(int base){
        Place[] placed = new Place[places.size()];
        boolean[] used = new boolean[places.size()];
        int cumulativeDist = 0;

        placed[0] = places.get(base);
        used[base] = true;
        for(int i =1; i < places.size(); i++){
            int temp = getNextCity(base,used);
            base = temp;
            placed[i] = places.get(temp);
            used[temp] = true;
            cumulativeDist = cumulativeDist + shortestdist;
        }
        if(cumulativeDist < currentShortest){
            currentShortest = cumulativeDist;
            tempPlaces = placed;
        }
    }

    /**
     * Finds the next city in the set for the current base town.
     */
    private int getNextCity(int base, boolean[] used){
        shortestdist = Integer.MAX_VALUE;
        int result = -1;
        int temp;
        for(int i = 0; i < places.size(); i++){
            if(!used[i]) {
                continue;
            }
            temp = allDistances[base][i];
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

