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
    Distance nautical;
    Distance kilometers;
    Distance defined;

    //Setup to be done before every test in TestDistance
    @Before
    public void initialize(){
        Place denver = new Place("dnvr","Denver",39.7392,-104.9903);
        Place boulder = new Place("bldr","Boulder",40.01499,-105.27055);
        miles = new Distance(denver,boulder,"miles");
        nautical = new Distance(denver,boulder,"nautical miles");
        kilometers = new Distance(denver,boulder,"kilometers");
        defined = new Distance(denver,boulder,"user defined", 12345.0);
    }

    @Test
    public void testMiles(){
        miles.calculate();
        int expected = 24;
        int result = miles.getDistance();
        assertEquals(expected,result);
    }

    @Test
    public void testNautical(){
        nautical.calculate();
        int expected = 21;
        int result = nautical.getDistance();
        assertEquals(expected,result);
    }

    @Test
    public void testKilometers(){
        kilometers.calculate();
        int expected = 39;
        int result = kilometers.getDistance();
        assertEquals(expected,result);
    }

    @Test
    public void testDefined(){
        defined.calculate();
        int expected = 75;
        int result = defined.getDistance();
        assertEquals(expected,result);
    }
}
