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
    trip.version = 4;
    trip.options = new Option();
    trip.options.map = "svg";
    trip.options.units = "miles";
    trip.options.optimization = "short";
    trip.places = new ArrayList<>();
    trip.places.add(new Place("mons", "Mons", 50.4545,3.9584));
    trip.places.add(new Place("prs", "Paris", 48.8557, 2.3498));
    trip.places.add(new Place("foco", "Fort Collins",40.585258, -105.084419));
    trip.places.add(new Place("anc", "Anchorage", 61.2178, -149.9235));
    trip.places.add(new Place("cro", "Cairo", 30.0460, 31.2360));
    trip.places.add(new Place("sjds", "San Juan Del Sur", 11.2641, -85.8654));
    trip.places.add(new Place("lndn", "London", 51.508424, -0.1271));
    trip.places.add(new Place("lmsk", "Lamutskoye", 65.523985, 168.826216));
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
    Collections.addAll(expectedDistances, 2346, 2340, 5429, 192, 132, 1995, 6131);
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void testSVG() {
    trip.options.map = "svg";
    trip.plan();
    assertEquals(trip.map, readFile("worldmaptest.svg"));
  }

  @Test
  public void testKML() {
    trip.options.map = "kml";
    trip.plan();
    assertEquals(trip.map, readFile("worldmaptest.kml"));
  }

  //reads a file and returns String with file contents
  private String readFile(String filename) {
    String line;
    StringBuilder strBuild = new StringBuilder();
    try {
      BufferedReader bufferedReader = new BufferedReader(
              new InputStreamReader(getClass().getClassLoader().getResourceAsStream(filename),
                      Charset.defaultCharset()));
      while ((line = bufferedReader.readLine()) != null) {
        strBuild.append(line).append('\n');
      }
    } catch (Exception e) {
      System.out.println(e.getStackTrace());
    }
    return strBuild.toString();
  }
}


