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
    private ArrayList<Integer> tempDistances = new ArrayList<>();

    //Constructor
    TripOpt(ArrayList<Place> places, String units){
        this.places = places;
        this.units = units;
    }

    TripOpt(ArrayList<Place> places, String units, Double unitRadius){
        this.places = places;
        this.units = units;
        this.unitRadius = unitRadius;
    }

    //Getters
    public ArrayList<Place> getPlaces() { return places; }
    public ArrayList<Integer> getDistances() { return distances; }

    /**
     * AHHHHHHHHH. AHHHHHHHHH.
     */
    public void shortOptimization(){
        int currentShortest = Integer.MAX_VALUE;
        for(int i = 0; i < places.size(); i++){
            nearestNeighbor(places.get(i), currentShortest);
        }
    }

    private void nearestNeighbor(Place base, int currentShortest){
        ArrayList<Place> used = new ArrayList<>();
        ArrayList<Place> unused = places;
        ArrayList<Integer> plan = new ArrayList<>();
        Place place;
        int cumulativeDist = 0;

        unused.remove(base);
        used.add(base);
        while(unused.size() > 0){
            place = getNextCity(used.get(used.size()-1),unused);
            used.add(place);
            unused.remove(place);
            int distance = measure(used.get(used.size()-1),place);
            cumulativeDist = cumulativeDist + distance;
            plan.add(distance);
        }
        if(cumulativeDist < currentShortest){
            tempPlaces = used;
            tempDistances = plan;
        }
    }

    private Place getNextCity(Place base, ArrayList<Place> set){
        Place result = set.get(0);
        int shortestdist = measure(base, set.get(0));
        for(int i = 0; i < set.size();i++){
            int temp = measure(base,set.get(i));
            if(temp < shortestdist){
                shortestdist = temp;
                result = set.get(i);
            }
        }
        return result;
    }

    private int measure(Place p1, Place p2){
        Distance temp = new Distance(p1,p2,units,unitRadius);
        temp.calculate();
        return temp.getDistance();
    }
}
