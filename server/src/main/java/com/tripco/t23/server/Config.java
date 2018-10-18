package com.tripco.t23.server;

import com.google.gson.Gson;
import com.tripco.t23.planner.Optimization;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class Config {

  private String type = "config";
  private short version = 3;
  private List<String> units = Arrays.asList("miles", "nautical miles", "kilometers", "user defined");
  private String unitName;
  private Double unitRadius;
  private ArrayList<Optimization> optimization = new ArrayList<>(
          Arrays.asList(new Optimization("none","The trip is not optimized"),
          new Optimization("short","Nearest neighbor")));
  private List<String> attributes = Arrays.asList("name","id","latitude","longitude");
  private Integer port;


  static String getConfig() {
    Config conf = new Config();
    Gson gson = new Gson();

    return gson.toJson(conf);
  }
}
