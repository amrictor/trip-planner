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
            for (int j = i; j < places.size(); j++) {
                int temp = measure(places.get(i), places.get(j));
                allDistances[i][j] = temp;
                allDistances[j][i] = temp;
            }
        }
        //Checks each starting location
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
    private void twoOptReverse(int i, int k) {
        while (i < k) {
            int temp2 = tempLookup[i];
            tempLookup[i] = tempLookup[k];
            tempLookup[k] = temp2;
            i++;
            k--;
        }
    }

    private void threeOpt(){
        boolean improvement = true;
        while(improvement){
            improvement = false;
            for(int a = 0; a < places.size()-2; a++){
                for(int c = a+1; c < places.size()-1; c++){
                    for(int e = c+1; e < places.size(); e++){
                        int b = a+1; int d = c+1; int f = e+1;
                        //Base case
                        int currentDistance = distanceTest(a,b,c,d,e,f);//
                        //Case 4
                        if(distanceTest(a,c,b,e,d,f) < currentDistance){
                            exchange4to6(b,c,d,e);
                            improvement = true;
                        }
                        //Case 5
                        else if(distanceTest(a,e,d,b,c,f) < currentDistance){
                            exchange4to6(b,c,b,e);
                            improvement = true;
                        }
                        //Case 6
                        else if(distanceTest(a,d,e,c,b,f) < currentDistance){
                            exchange4to6(d,e,b,e);
                            improvement = true;
                        }
                        //Case 7
                        else if(distanceTest(a,d,e,b,c,f) < currentDistance){
                            exchange7(b,c,d,e);
                            improvement = true;
                        }
                        //Case 1
                        else if(distanceTest(a,e,d,c,b,f) < currentDistance){
                            exchange1to3(b,e);
                            improvement = true;
                        }
                        //Case 2
                        else if(distanceTest(a,c,b,d,e,f) < currentDistance){
                            exchange1to3(b,c);
                            improvement = true;
                        }
                        //Case 3
                        else if(distanceTest(a,b,c,e,d,f) < currentDistance){
                            exchange1to3(d,e);
                            improvement = true;
                        }
                    }
                }
            }
        }
    }

    /**
     * Distance function for the above 3-opt if statements.
     */
    private int distanceTest(int a, int b, int c, int d, int e, int f){
        return allDistances[tempLookup[a]][tempLookup[b]]+
                allDistances[tempLookup[c]][tempLookup[d]]+
                allDistances[tempLookup[e]][tempLookup[f]];
    }

    /**
     * Exchange functions for all above distance functions
     */
    private void exchange1to3(int a, int b){ twoOptReverse(a,b);}

    private void exchange4to6(int a, int b, int c, int d){
        twoOptReverse(a,b);
        twoOptReverse(c,d);
    }

    private void exchange7(int b, int c, int d, int e){
        twoOptReverse(b,c);
        twoOptReverse(d,e);
        twoOptReverse(b,e);
    }
}

