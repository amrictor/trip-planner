package com.tripco.t23.planner;

import java.util.List;

public class Query {
    //Variables to match the search TFFI.
    private double version;
    private String type;
    private String match;
    private String limit;
    private List<String> places;

    //Database configuration info
    private final static String myDriver = "com.mysql.jbdc.Driver";
    private final static String myUrl = "jbdc:mysql://faure.cs.colostate.edu/cs314";
    private final static String user = "cs314-db";
    private final static String pass = "eiK5lietluej";

    //Count the number of records and retrieve the data
    private final static String count = "";
    private final static String search = "";


}
