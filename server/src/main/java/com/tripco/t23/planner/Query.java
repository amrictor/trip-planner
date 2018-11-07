package com.tripco.t23.planner;

import java.sql.*;
import java.util.ArrayList;

public class Query {
    //Variables to match the search TFFI.
    public double version;
    public String type;
    public String match;
    public ArrayList<Filter> filters;
    public int limit;
    public int found;
    public ArrayList<Place> places;


    //Database configuration info
    private static final String myDriver = "com.mysql.jdbc.Driver";
    private static final String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
    private static final String user = "cs314-db";
    private static final String pass = "eiK5liet1uej";

    //Count the number of records and retrieve the data
    private static final String count =  "";
    private static final String search = "";

    /**
     * Sets the connection and queries the database.
     */
    public void find(){
        String queryhead = "SELECT * FROM airports WHERE ";
        String counthead = "SELECT count(*) FROM airports WHERE ";
        String question = "(name LIKE '%" + match + "%'" + "or id LIKE '%" + match
                 + "%' or municipality LIKE '%" + match + "%' or type LIKE '%" + match + "%') ";
        if (!filters.isEmpty()) {
            for(int j = 0; j < filters.size(); j++) {
                question += " and (";
                for (int i = 0; i < filters.get(j).values.size() - 1; i++) {
                    question += filters.get(j).name + " like " + "'%" + filters.get(j).values.get(i) + "%' or ";
                    System.out.println(question);
                }
                question += filters.get(j).name + " like " + "'%" + filters.get(j).values.get(filters.get(j).values.size()-1) + "%') ";
            }
        }
        if(limit != 0){
            question  += "limit " + limit;
        }

        question += ";";

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

    /**
     *Builds the responses from mySQL into places for returning.
     */
    public void buildPlaces(ResultSet count, ResultSet query) throws SQLException{
        places = new ArrayList<>();
        try{
            count.next();
            found = count.getInt(1);
            System.out.println(found);
            while(query.next()){
                String id = query.getString("id");
                String name = query.getString("name");
                Double latitude = query.getDouble("latitude");
                Double longitude = query.getDouble("longitude");
                Place place = new Place(id,name,latitude,longitude);
                places.add(place);
            }
            System.out.println(found);
        }catch(Exception e) {
            System.err.println("Exception:" + e.getMessage());
        }
    }
}
