package com.tripco.t23.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t23.server.HTTP;
import spark.Request;

public class Search {

    private Query query;

    /**
     * Handles the TFFI request and sends it to Query for real answers
     *
     */
    public Search(Request request){
        // first print the request
        System.out.println(HTTP.echoRequest(request));

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        // convert the body of the request to a Java class.
        Gson gson = new Gson();
        query = gson.fromJson(requestBody, Query.class);

        //Actually query the database.
        query.find();
    }

    /** Handles the response for a Query object.
     * Does the conversion from a Java class to a Json string.*
     */
    public String getQuery() {
        Gson gson = new Gson();
        return gson.toJson(query);
    }
}
