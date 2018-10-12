package com.tripco.t23.server;

import com.google.gson.Gson;
import com.tripco.t23.planner.Optimization;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

public class Config {

  private short version = 3;
  private String type = "config";
  private List<String> units = Arrays.asList("miles", "nautical miles", "kilometers", "user defined");
  private ArrayList<Optimization> optimization = new ArrayList<>(
          Arrays.asList(new Optimization("none","The trip is not optimized"),
          new Optimization("short","Nearest neighbor"),
          new Optimization("shorter","2-opt")));
  private Integer port;
  private String unitName;
  private Double unitRadius;

  static String getConfig() {
    Config conf = new Config();
    Gson gson = new Gson();

    return gson.toJson(conf);
  }
}