package com.tripco.t23.planner;

import com.mysql.jdbc.Driver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class Query {
    //Variables to match the search TFFI.
    private double version;
    private String type;
    private String match;
    private String limit;
    private ArrayList<Place> places;

    //Database configuration info
    private final static String myDriver = "com.mysql.jdbc.Driver";
    private final static String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
    private final static String user = "cs314-db";
    private final static String pass = "eiK5liet1uej";

    //Count the number of records and retrieve the data
    private final static String count =  "";
    private final static String search = "";

    //Sets the connection and queries the database.
    public void find(){
        String queryhead = "SELECT * FROM airports WHERE ";
        String counthead = "SELECT count(*) FROM airports WHERE ";
        String question = "name LIKE '%" + match + "%'" + "or id LIKE '%" + match + "%' or municipality LIKE '%" + match + "%' or type LIKE '%" + match + "%' ";
        if(!limit.equals("0")){
            question  = question + "limit " + limit + ";";
        }
        else{
            question = question + ";";
        }
        try{
            //Try to find the class for the driver variable
            Class.forName(myDriver);

            //Try to connect to database and query
            try(Connection conn = DriverManager.getConnection(myUrl,user,pass);
                Statement stCount = conn.createStatement();
                Statement stQuery = conn.createStatement();
                //This will be implemented later.
                ResultSet rsCount = stCount.executeQuery(counthead + question);
                ResultSet rsQuery = stQuery.executeQuery(queryhead + question)
            ){
                buildPlaces(rsCount,rsQuery);
            }

        }catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }

    //Sets the results from sql() into places
    public void buildPlaces(ResultSet count, ResultSet query){
        places = new ArrayList<>();

        try{
            while(query.next()){
                String id = query.getString("id");
                String name = query.getString("name");
                Double latitude = query.getDouble("latitude");
                Double longitude = query.getDouble("longitude");
                System.out.println(id + " " + name + " " + latitude + " " + longitude);
                Place place = new Place(id,name,latitude,longitude);
                places.add(place);
            }
        }catch(Exception e) {
            System.err.println("Exception:" + e.getMessage());
        }
    }
}
