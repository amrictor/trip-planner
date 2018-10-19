package com.tripco.t23.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

/*
    This class contains tests for the Query class.
 */
@RunWith(JUnit4.class)
public class TestQuery {
    Query query;

    //Setup to be done before every test in TestQuery
    @Before
    public void initialize(){
        query = new Query();
        query.limit = "1";
        query.match = "denver";
    }

    @Test
    public void testFind(){
        query.find();
        Place place = new Place("OCD4", "Kaufmann Heliport", 40.1463012695,-104.887001038);
        assertEquals(place.id,query.places.get(0).id);
        assertEquals(place.name,query.places.get(0).name);
    }
}
