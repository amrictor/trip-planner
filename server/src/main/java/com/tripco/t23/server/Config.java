package com.tripco.t23.server;

import com.google.gson.Gson;

import java.util.Arrays;
import java.util.List;

public class Config {

  private short version = 2;
  private String type = "config";

  private List<String> units = Arrays.asList("miles", "nautical miles", "kilometers", "user defined");
  private String unitName;
  private String unitRadius;

  static String getConfig() {
    Config conf = new Config();
    Gson gson = new Gson();

    return gson.toJson(conf);
  }
}
