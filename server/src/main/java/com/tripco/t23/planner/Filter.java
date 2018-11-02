package com.tripco.t23.planner;

import java.util.ArrayList;

public class Filter {
    public String name;
    public ArrayList<String> values;

    public Filter(String name, ArrayList<String> values){
        this.name = name;
        this.values = values;
    }
}
