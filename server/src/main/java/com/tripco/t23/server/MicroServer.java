package com.tripco.t23.server;

import com.tripco.t23.planner.Calculate;
import com.tripco.t23.planner.Distance;
import com.tripco.t23.planner.Plan;
import com.tripco.t23.planner.Search;

import spark.Request;
import spark.Response;

import java.net.InetAddress;
import java.net.UnknownHostException;
import spark.Spark;
import static spark.Spark.*;


/** A simple micro-server for the web.  Just what we need, nothing more.
 *
 */
public class MicroServer {

  private int    port;
  private String name;
  private String path = "/public/";

  /** Creates a micro-server to load static files and provide REST APIs.
   *
   * @param port Which port to start the server on
   * @param name Name of the server
   */
  MicroServer(int port, String name) {
    this.port = port;
    this.name = name;

    port(port);

    // serve the static files: index.html and bundle.js
    Spark.staticFileLocation(this.path);
    get("/", (req, res) -> {
      res.redirect("index.html");
      return null;
    });

    // register all micro-services and the function that services them.
    // start with HTTP GET
    get("/about", this::about);
    get("/echo", this::echo);
    get("/hello/:name", this::hello);
    get("/team", this::team);
    // client is sending data, so a HTTP POST is used instead of a GET
    get("/config", this::config);
    post("/plan", this::plan);
    post("/distance", this::distance);

    System.out.println("\n\nServer running on port: " + this.port + "\n\n");
  }

  /** A REST API that describes the server.
   *
   * @param request input tffi
   * @param response output tffi
   * @return String that describes microserver
   */
  private String about(Request request, Response response) {

    response.type("text/html");
    response.header("Access-Control-Allow-Origin", "*");

    return "<html><head></head><body><h1>"+name+" Micro-server on port "+port+"</h1></body></html>";
  }

  /** A REST API that returns the current server configuration
   *
   * @param request input tffi
   * @param response output tffi
   * @return returns config()
   */
  private String config(Request request, Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return Config.getConfig();
  }

  /** A REST API that echos the client request.
   *
   * @param request input tffi
   * @param response output tffi
   * @return returns an echo
   */
  private String echo(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return HTTP.echoRequest(request);
  }

  /** A REST API demonstrating the use of a parameter.
   *
   * @param request input tffi
   * @param response output tffi
   * @return returns name printed to screen
   */
  private String hello(Request request, Response response) {

    response.type("text/html");
    response.header("Access-Control-Allow-Origin", "*");

    return Greeting.html(request.params(":name"));
  }


  /** A REST API to support trip planning.
   *
   * @param request input tffi
   * @param response output tffi
   * @return returns trip object
   */
  private String plan(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return new Plan(request).getTrip();
  }

  private String distance(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return new Calculate(request).getDistance();
  }

  private String search(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return new Search(request).getQuery();
  }

  /** A REST API that returns the team information associated with the server.
   *
   * @param request input tffi
   * @param response out tffi
   * @return returns the name
   */
  private String team(Request request, Response response) {

    response.type("text/plain");
    response.header("Access-Control-Allow-Origin", "*");

    return name;
  }
}