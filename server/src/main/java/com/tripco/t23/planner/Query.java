package com.tripco.t23.planner;

import com.mysql.jdbc.Driver;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
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
    //Testing in Travis
    private String isTravis = System.getenv("TRAVIS");
    private String isDevelopment = System.getenv("CS314_ENV");
    private static final String myDriver = "com.mysql.jdbc.Driver";
    private String myUrl;
    private String user;
    private String pass;


    /**
     * Sets up the right database connection
     */
    private void setup(){
        if(isTravis != null && isTravis.equals("true")){
            myUrl = "jdbc:mysql://127.0.0.1/cs314";
            user = "travis";
            pass= null;
        }
        else if(isDevelopment != null && isDevelopment.equals("development")){
            myUrl = "jdbc:mysql://127.0.0.1:56247/cs314";
            user = "cs314-db";
            pass = "eiK5liet1uej";
        }
        else{
            myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            user = "cs314-db";
            pass = "eiK5liet1uej";
        }
    }
    /**
     * Sets the connection and queries the database.
     */
    public void find(){
        setup();
        String queryhead = "SELECT world_airports.id, world_airports.name, "
                + "world_airports.latitude, world_airports.longitude FROM continents "
                + "INNER JOIN country ON continents.id = country.continent "
                + "INNER JOIN region ON country.id = region.iso_country "
                + "INNER JOIN world_airports ON region.id = world_airports.iso_region "
                + "WHERE ";
        String counthead = "SELECT count(*) FROM continents "
                + "INNER JOIN country ON continents.id = country.continent "
                + "INNER JOIN region ON country.id = region.iso_country "
                + "INNER JOIN world_airports ON region.id = world_airports.iso_region "
                + "WHERE ";

        String question = "(country.name LIKE '%" + match + "%' "
                + "OR region.name LIKE '%" + match + "%' "
                + "OR world_airports.name LIKE '%" + match + "%' "
                + "OR world_airports.municipality LIKE '%" + match + "%') ";

        if (!filters.isEmpty()) {
            for(int j = 0; j < filters.size(); j++) {
                if(!filters.get(j).values.isEmpty()) {
                question += " and (";
                    for (int i = 0; i < filters.get(j).values.size() - 1; i++) {
                        question += filters.get(j).name + " LIKE " + "'%"
                                + filters.get(j).values.get(i) + "%' OR ";
                    }
                question += filters.get(j).name + " LIKE " + "'%"
                        + filters.get(j).values.get(filters.get(j).values.size()-1) + "%') ";
                }
            }
        }
        if(limit != 0){
            question  += "LIMIT " + limit;
        }else {
            question += "LIMIT " + 50;
        }

        question += ";";
        //System.out.println(queryhead + question);
        //System.out.println(counthead + question);
        try{
            //Try to find the class for the driver variable
            Class.forName(myDriver);

            //Try to connect to database and query
            try(Connection conn = DriverManager.getConnection(myUrl,user,pass);
                Statement stCount = conn.createStatement();
                Statement stQuery = conn.createStatement();

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
    public void buildPlaces(ResultSet count, ResultSet query) {

        places = new ArrayList<>();
        try{
            count.next();
            found = count.getInt("count(*)");
            //System.out.println(found);
            while(query.next()){
                String id = query.getString("world_airports.id");
                String name = query.getString("world_airports.name");
                Double latitude = query.getDouble("world_airports.latitude");
                Double longitude = query.getDouble("world_airports.longitude");
                Place place = new Place(id,name,latitude,longitude);
                places.add(place);
            }

        }catch(Exception e) {
            System.err.println("Exception:" + e.getMessage());
        }
    }
}
