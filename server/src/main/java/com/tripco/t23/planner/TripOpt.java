package com.tripco.t23.planner;

import java.util.ArrayList;
import java.util.Arrays;


/**
 * This class handles the optimization requests, changing both places and distances.
 */
public class TripOpt {
    private ArrayList<Place> places = new ArrayList<>();
    private String units;
    private Double unitRadius;
    private int opt;
    private Place[] tempPlaces;
    private int[] tempLookup;
    private int[][] allDistances;
    private int currentShortest;
    private int shortestdist;

    //Constructor
    TripOpt(ArrayList<Place> places, String units, int opt) {
        this.places = places;
        this.units = units;
        this.tempLookup = new int[places.size() + 1];
        this.opt = opt;
        currentShortest = Integer.MAX_VALUE;
        allDistances = new int[places.size()][places.size()];
    }

    TripOpt(ArrayList<Place> places, String units, Double unitRadius, int opt) {
        this.places = places;
        this.units = units;
        this.unitRadius = unitRadius;
        this.tempLookup = new int[places.size() + 1];
        this.opt = opt;
        currentShortest = Integer.MAX_VALUE;
        allDistances = new int[places.size()][places.size()];
    }

    //Getters
    public ArrayList<Place> getPlaces() {
        return places;
    }

    /**
     * Sends each town to retrieve it's nearest neighbor.
     */
    public void shortOptimization() {
        for (int i = 0; i < places.size(); i++) {
            for (int j = 0; j < places.size(); j++) {
                allDistances[i][j] = measure(places.get(i), places.get(j));
            }
        }
        for (int i = 0; i < places.size(); i++) {
            nearestNeighbor(i);
        }
        places = new ArrayList<>(Arrays.asList(tempPlaces));
        places.remove(places.size() - 1);
    }

    /**
     * Makes the nearest neighbor for the base town its sent.
     */
    private void nearestNeighbor(int base) {
        Place[] placed = new Place[places.size() + 1];
        boolean[] used = new boolean[places.size() + 1];
        int cumulativeDist = 0;

        placed[0] = places.get(base);
        placed[places.size()] = places.get(base);
        tempLookup[0] = base;
        tempLookup[places.size()] = base;
        used[base] = true;
        used[places.size()] = true;
        for (int i = 1; i < places.size(); i++) {
            int temp = getNextCity(base, used);
            base = temp;
            placed[i] = places.get(temp);
            tempLookup[i] = temp;
            used[temp] = true;
            cumulativeDist = cumulativeDist + shortestdist;
        }
        cumulativeDist += allDistances[tempLookup[0]][tempLookup[tempLookup.length - 2]];
        if (opt == 3) {
            threeOpt();
            cumulativeDist = 0;
            for (int i = 0; i < tempLookup.length-1; i++) {
                placed[i] = places.get(tempLookup[i]);
                cumulativeDist += allDistances[tempLookup[i]][tempLookup[i+1]];
            }
        }
        if (opt == 2) {
            twoOpt();
            cumulativeDist = 0;
            for (int i = 0; i < tempLookup.length-1; i++) {
                placed[i] = places.get(tempLookup[i]);
                cumulativeDist += allDistances[tempLookup[i]][tempLookup[i+1]];
            }
        }
        if (cumulativeDist < currentShortest) {
            currentShortest = cumulativeDist;
            tempPlaces = placed;
        }
    }

    /**
     * Finds the next city in the set for the current base town.
     */
    private int getNextCity(int base, boolean[] used) {
        shortestdist = Integer.MAX_VALUE;
        int result = -1;
        int temp;
        for (int i = 0; i < places.size(); i++) {
            if (used[i]) {
                continue;
            }
            temp = allDistances[base][i];
            if (temp < shortestdist) {
                shortestdist = temp;
                result = i;
            }
        }
        return result;
    }

    /**
     * Actually measures the distances.
     */
    private int measure(Place p1, Place p2) {
        Distance temp;
        if (units.equals("user defined")) {
            temp = new Distance(p1, p2, units, unitRadius);
        } else {
            temp = new Distance(p1, p2, units);
        }
        temp.calculate();
        return temp.getDistance();
    }

    /**
     * Implements improvements after NearestNeighbor via 2opt
     */
    private void twoOpt() {
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            int n = tempLookup.length - 1;
            for (int i = 0; i <= n - 3; i++) {
                for (int k = i + 2; k <= n - 1; k++) {
                    int delta = -allDistances[tempLookup[i]][tempLookup[i + 1]] -
                            allDistances[tempLookup[k]][tempLookup[k + 1]] +
                            allDistances[tempLookup[i]][tempLookup[k]] +
                            allDistances[tempLookup[i + 1]][tempLookup[k + 1]];
                    if (delta < 0) {
                        twoOptReverse(i + 1, k);
                        improvement = true;
                    }
                }
            }
        }

    }

    /**
     * Handles the swapping of both the lookup array and the places array
     */
    private void twoOptReverse(int i1, int k) {
        while (i1 < k) {
            int temp2 = tempLookup[i1];
            tempLookup[i1] = tempLookup[k];
            tempLookup[k] = temp2;
            i1++;
            k--;
        }
    }

    private void threeOpt(){
        boolean improvement = true;
        while(improvement){
            improvement = false;
            for(int i = 0; i < places.size()-2; i++){
                for(int j = i+1; j < places.size()-1; j++){
                    for(int k = j+1; k < places.size(); k++){
                        int currentDistance = distance0(i,j,k);
                        if(distance4(i,j,k) < currentDistance){
                            exchange4(i,j,k);
                            improvement = true;
                            continue;
                        }
                        else if(distance5(i,j,k) < currentDistance){
                            exchange5(i,j,k);
                            improvement = true;
                            continue;
                        }
                        else if(distance6(i,j,k) < currentDistance){
                            exchange6(i,j,k);
                            improvement = true;
                            continue;
                        }
                        else if(distance7(i,j,k) < currentDistance){
                            exchange7(i,j,k);
                            improvement = true;
                            continue;
                        }
                        else if(distance1(i,j,k) < currentDistance){
                            exchange1(i,j,k);
                            improvement = true;
                            continue;
                        }
                        else if(distance2(i,j,k) < currentDistance){
                            exchange2(i,j,k);
                            improvement = true;
                            continue;
                        }
                        else if(distance3(i,j,k) < currentDistance){
                            exchange3(i,j,k);
                            improvement = true;
                            continue;
                        }
                    }
                }
            }
        }
    }

    /**
     * Distance functions for the above 3-opt if statements.
     */
    private int distance0(int i, int j, int k){
        return allDistances[tempLookup[i]][tempLookup[i+1]]+
                allDistances[tempLookup[j]][tempLookup[j+1]]+
                allDistances[tempLookup[k]][tempLookup[k+1]];
    }

    private int distance1(int i, int j, int k){
        return allDistances[tempLookup[i]][tempLookup[k]]+
                allDistances[tempLookup[j+1]][tempLookup[j]]+
                allDistances[tempLookup[i+1]][tempLookup[k+1]];
    }

    private int distance2(int i, int j, int k){
        return allDistances[tempLookup[i]][tempLookup[j]]+
                allDistances[tempLookup[i+1]][tempLookup[j+1]]+
                allDistances[tempLookup[k]][tempLookup[k+1]];
    }

    private int distance3(int i, int j, int k){
        return allDistances[tempLookup[i]][tempLookup[i+1]]+
                allDistances[tempLookup[j]][tempLookup[k]]+
                allDistances[tempLookup[j+1]][tempLookup[k+1]];
    }

    private int distance4(int i, int j, int k){
        return allDistances[tempLookup[i]][tempLookup[j]]+
                allDistances[tempLookup[i+1]][tempLookup[k]]+
                allDistances[tempLookup[j+1]][tempLookup[k+1]];
    }

    private int distance5(int i, int j, int k){
        return allDistances[tempLookup[i]][tempLookup[k]]+
                allDistances[tempLookup[j+1]][tempLookup[i+1]]+
                allDistances[tempLookup[j]][tempLookup[k+1]];
    }

    private int distance6(int i, int j, int k){
        return allDistances[tempLookup[i]][tempLookup[j+1]]+
                allDistances[tempLookup[k]][tempLookup[j]]+
                allDistances[tempLookup[i+1]][tempLookup[k+1]];
    }

    private int distance7(int i, int j, int k){
        return allDistances[tempLookup[i]][tempLookup[j+1]]+
                allDistances[tempLookup[k]][tempLookup[i+1]]+
                allDistances[tempLookup[j]][tempLookup[k+1]];
    }

    /**
     * Exchange functions for all above distance functions
     */
    private void exchange1(int i, int j, int k){
        twoOptReverse(i+1,k);
    }

    private void exchange2(int i, int j, int k){
        twoOptReverse(i+1,j);
    }

    private void exchange3(int i, int j, int k){
        twoOptReverse(j+1,k);
    }

    private void exchange4(int i, int j, int k){
        twoOptReverse(i+1,j);
        twoOptReverse(j+1,k);
    }

    private void exchange5(int i, int j, int k){
        twoOptReverse(i+1,j);
        twoOptReverse(i+1,k);
    }

    private void exchange6(int i, int j, int k){
        twoOptReverse(j+1,k);
        twoOptReverse(i+1,k);
    }

    private void exchange7(int i, int j, int k){
        twoOptReverse(i+1,j);
        twoOptReverse(j+1,k);
        twoOptReverse(i+1,k);
    }
}

