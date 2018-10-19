package com.tripco.t23.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

/**
 * This class contains tests for the Distance class
 */
@RunWith(JUnit4.class)
public class TestDistance {
    Distance miles;

    //Setup to be done before every test in TestDistance
    @Before
    public void initialize(){
        Place denver = new Place("dnvr","Denver",39.7392,-104.9903);
        Place boulder = new Place("bldr","Boulder",40.01499,-105.27055);
        miles = new Distance(denver,boulder,"miles");
    }

    @Test
    public void testMiles(){
        miles.calculate();
        int expected = 24;
        int result = miles.getDistance();
        assertEquals(expected,result);
    }
}
