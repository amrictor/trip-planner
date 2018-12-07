package com.tripco.t23.server;

import com.google.gson.Gson;
import com.tripco.t23.planner.Filter;
import com.tripco.t23.planner.Optimization;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class Config {

  private String type = "config";
  private short version = 4;
  private List<String> units = Arrays.asList("miles", "nautical miles", "kilometers", "user defined");
  private String unitName;
  private Double unitRadius;
  private ArrayList<Optimization> optimization = new ArrayList<>(
          Arrays.asList(new Optimization("none","The trip is not optimized"),
          new Optimization("short","Nearest neighbor"),
          new Optimization("shorter","2-opt"),
          new Optimization("shortest","3-opt")));
  private List<String> attributes = Arrays.asList("name","id","latitude","longitude");
  private ArrayList<Filter> filters = new ArrayList<>(
          Arrays.asList(
                  new Filter("type", new ArrayList<>(
                    Arrays.asList("balloonport", "heliport", "airport", "seaplane base"))),
                  new Filter("countries", new ArrayList<>(
                          Arrays.asList("Costa Rica", "Japan", "Kenya",
                                  "New Zealand", "Spain", "United States"))),
                  new Filter("continents", new ArrayList<>(
                          Arrays.asList("Africa", "Antarctica", "Asia", "Europe",
                                  "Oceania", "North America", "South America")
                  ))
          ));
  private List<String> maps = Arrays.asList("svg", "kml");
  private Integer port;


  static String getConfig() {
    Config conf = new Config();
    Gson gson = new Gson();

    return gson.toJson(conf);
  }
}
