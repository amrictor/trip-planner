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
        for(int i = 0; i < places.size(); i++){
            System.out.println(Arrays.toString(allDistances[i]));
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
                temp = allDistances[base][i];
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

    public static void main(String[] args){
        ArrayList<Place> list = new ArrayList<>();
        Place first = new Place("0", "Springfield", 37.3, -102.54);
        Place second = new Place("1", "Littleton", 39.64, -104.33);
        Place third = new Place("2", "San Luis", 37.28, -105.43);
        Place fourth = new Place("3", "Craig", 40.57,-108.2);
        list.add(first);
        list.add(second);
        list.add(third);
        list.add(fourth);
        TripOpt test = new TripOpt(list,"miles");
        for(int i = 0; i < test.places.size();i++){
            System.out.println(Arrays.toString(test.allDistances[i]));
        }
        boolean[] set = {true,true,true,true};
        System.out.println(test.getNextCity(0,set));
        //for(int i = 0; i < test.places.size();i++){
        //    System.out.print(test.places.get(i).id);
        //}
    }
}

