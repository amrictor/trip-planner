package com.tripco.t23.planner;

import java.sql.DriverManager;
import java.util.List;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class Query {
    //Variables to match the search TFFI.
    private double version;
    private String type;
    private String match;
    private String limit;
    private ArrayList<Place> places;

    //Database configuration info
    private final static String myDriver = "com.mysql.jbdc.Driver";
    private final static String myUrl = "jbdc:mysql://faure.cs.colostate.edu/cs314";
    private final static String user = "cs314-db";
    private final static String pass = "eiK5lietluej";

    //Count the number of records and retrieve the data
    private final static String count = "";
    private final static String search = "";

    //Sets the instance of places
    public void find(){
        this.places = sql();
    }

    //Sets the connection and queries the database.
    public ArrayList<Place> sql(){
        try{
            //Try to find the class for the driver variable
            //Class.forName(myDriver);

            //Try to connect to database and query
            try(Connection conn = DriverManager.getConnection(myUrl,user,pass);
                Statement stCount = conn.createStatement();
                Statement stQuery = conn.createStatement();
                ResultSet rsCount = stCount.executeQuery(count);
                ResultSet rsQuery = stQuery.executeQuery(search)
            ){
                return buildPlaces(rsCount,rsQuery);
            }

        }catch(Exception e){
            System.err.println("Exception: "+e.getMessage());
        }
        return null;
    }

    //Sets the results from sql() into places
    public ArrayList<Place> buildPlaces(ResultSet count, ResultSet query){
        ArrayList<Place> places = new ArrayList<>();
        try{
            while(query.next()){
                String id = query.getString("id");
                String name = query.getString("name");
                double latitude = query.getDouble("latitude");
                double longitude = query.getDouble("longitude");
                Place place = new Place(id,name,latitude,longitude);
                places.add(place);
            }
        }catch(Exception e){
            System.err.println("Exception:"+e.getMessage());
        }
        return places;
    }
}
