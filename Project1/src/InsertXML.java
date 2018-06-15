import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.*;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class InsertXML {
	public static void main(String args[]) throws InstantiationException, IllegalAccessException, ClassNotFoundException {
		String loginUser = "root";
        String loginPasswd = "cs122bfablix";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";
        
        SAXCastParser scp = new SAXCastParser();
        Map<String, JsonObject> moviesObject = scp.getData();
        
        SAXStarParser sscp = new SAXStarParser();
        Map<String, String> starsObject = sscp.getData();
        
        
        try {
//            Class.forName("org.gjt.mm.mysql.Driver");
        		Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
            
            int currStar = 0;
            for (Map.Entry<String, String> entry : starsObject.entrySet()) {
            		System.out.println("Current Star #: " + currStar);
            		++currStar;
	        		String starName = entry.getKey();
	        		String starBirthYear = entry.getValue();
	        		
	        		if (starBirthYear.trim().length() == 0) {
	        			starBirthYear = "null";
	        		}
	        		
	        		if (!starBirthYear.matches("-?\\d+")) {
	        			starBirthYear = "null";
	        		}
	        		
	        		// Declare our statement
                
                String addStarQuery = "CALL add_star(?, " + starBirthYear + ")";
                
                PreparedStatement pst = dbcon.prepareStatement(addStarQuery);
                
                pst.setString(1, starName);
                
                ResultSet addStar_rs = pst.executeQuery();
                
                pst.close();
                
	        }
            int currMovie = 0;
            for (Map.Entry<String, JsonObject> entry : moviesObject.entrySet()) {
            		System.out.println("Current Movie #: " + currMovie);
            		++currMovie;
            		String movieId = entry.getKey();
            		
            		JsonObject movieInfo = entry.getValue();
            		
            		JsonArray genresArray = movieInfo.getAsJsonArray("genres");
            		JsonArray starsArray = movieInfo.getAsJsonArray("stars");
            		
            		if (genresArray == null) {
            			genresArray = new JsonArray();
            		}
            		
            		if (starsArray == null) {
            			starsArray = new JsonArray();
            		}
            		
            		String title = movieInfo.get("title").getAsString();
            		JsonElement jsonYear = movieInfo.get("year");
            		String year;
            		
            		if (jsonYear.isJsonNull()) {
            			year = "-1";
            		}
            		else {
            			year = jsonYear.getAsString();
	            		if (year.trim().length() == 0) {
	    	        			year = "-1";
	    	        		}
	    	        		
	    	        		if (!year.matches("-?\\d+")) {
	    	        			year = "-1";
	    	        		}
            		}
            		
            		
            		
            		String director = movieInfo.get("director").getAsString();
            		String genre = " ";
            		String star = " ";
            		
            		if (movieId.trim().length() != 0 || movieId != null) {
            		
	            		for (int i = 0; i < genresArray.size(); ++i) {
	            			
	            			genre = genresArray.get(i).getAsString();
	            			
	            			String addMovieQuery = "CALL add_movie(?, ?, " + year + ", ?, ?, ?)";
	            			
	            			PreparedStatement pst = dbcon.prepareStatement(addMovieQuery);
	                        
	            			pst.setString(1, movieId);
	            			pst.setString(2, title);
	            			pst.setString(3, director);
	            			pst.setString(4, star);
	            			pst.setString(5, genre);
	                    
	            			ResultSet addMovie_rs = pst.executeQuery();
	                    
	            			pst.close();
	            			
	            		}
	            		
	            		for (int i = 0; i < starsArray.size(); ++i) {
	            			
	            			star = starsArray.get(i).getAsString();
	            			
	            			String addMovieQuery = "CALL add_movie(?, ?, " + year + ", ?, ?, ?)";
	            			
	            			PreparedStatement pst = dbcon.prepareStatement(addMovieQuery);
	                        
	            			pst.setString(1, movieId);
	            			pst.setString(2, title);
	            			pst.setString(3, director);
	            			pst.setString(4, star);
	            			pst.setString(5, genre);
	                    
	            			ResultSet addMovie_rs = pst.executeQuery();
	                    
	            			pst.close();
	  
	            		}
            		}
            		
            }
            dbcon.close();
        } catch (SQLException ex) {
            while (ex != null) {
                System.out.println("SQL Exception:  " + ex.getMessage());
                ex = ex.getNextException();
            }
        }
	}
}
