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
    private LinkedList<Place> tempPlaces = new LinkedList<>();
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
        places.clear();
        places.addAll(tempPlaces);
    }

    /**
     * Makes the nearest neighbor for the base town its sent.
     */
    private void nearestNeighbor(int base){
        LinkedList<Place> placed = new LinkedList<>();
        boolean[] used = new boolean[places.size()];
        int place;
        int cumulativeDist = 0;

        used[base] = true;
        placed.add(places.get(base));
        while(placed.size() != places.size()){
            place = getNextCity(placed.size()-1,used);
            placed.add(places.get(place));
            used[place] = true;
            cumulativeDist = cumulativeDist + shortestdist;
        }
        if(cumulativeDist < currentShortest){
            tempPlaces = placed;
            currentShortest = cumulativeDist;
        }
    }

    /**
     * Finds the next city in the set for the current base town.
     */
    private int getNextCity(int base, boolean[] set){
        shortestdist = Integer.MAX_VALUE;
        int temp;
        int result = -1;
        for(int i = 0; i < places.size(); i++){
            if(!set[i]) {
                temp = allDistances[base][i];
                if(temp == 0){
                    continue;
                }
            }
            else{
                continue;
            }
            if(temp < shortestdist){
                shortestdist = temp;
                System.out.println(shortestdist);
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

