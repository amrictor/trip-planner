package com.tripco.t23.planner;

/**
 * Describes the places to visit in a trip in TFFI format.
 * There may be other attributes of a place, but these are required to plan a trip.
 */
public class Place {
  public String id;
  public String name;
  public double latitude;
  public double longitude;

  Place() {}

  Place (String id, String name, double latitude, double longitude) { //constructor for testing purposes
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  Place (Place p) {
    this.id = p.id;
    this.name = p.name;
    this.latitude = p.latitude;
    this.longitude = p.longitude;
  }

}
