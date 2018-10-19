package com.tripco.t23.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {
  Trip trip;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
    trip.options = new Option();
    trip.options.units = "miles";
    trip.options.optimization = "short";
    trip.places = new ArrayList<Place>();
    trip.places.add(new Place("dnvr", "Denver", 39.7392,-104.9903));
    trip.places.add(new Place("bldr", "Boulder", 40.01499, -105.27055));
    trip.places.add(new Place("foco", "Fort Collins",40.585258, -105.084419));
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue( true);
  }

  @Test
  public void testDistances() {


    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<>();
    Collections.addAll(expectedDistances, 24, 41, 59);
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
  }

  @Test 
  public void testMap() {
    trip.plan();
    String test = "";
    try {
      test = new String(Files.readAllBytes(Paths.get(new File("../Resources/test.svg").getAbsolutePath())));
    } catch(Exception e){
      e.printStackTrace();
    }

    assertEquals(trip.map, test);
  }
}
