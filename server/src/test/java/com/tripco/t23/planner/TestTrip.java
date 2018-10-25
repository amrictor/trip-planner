package com.tripco.t23.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
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
    trip.version = 3;
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

    String line = null;
    StringBuilder strBuild = new StringBuilder();
    try {
      BufferedReader bufferedReader = new BufferedReader(
              new InputStreamReader(getClass().getClassLoader().getResourceAsStream("test.svg"),
                      Charset.defaultCharset()));
      while ((line = bufferedReader.readLine()) != null) {
        strBuild.append(line+'\n');
      }
    } catch (Exception e) {
      System.out.println(e.getStackTrace());
    }
    String test = strBuild.toString();
    assertEquals(trip.map, test);
  }
}
