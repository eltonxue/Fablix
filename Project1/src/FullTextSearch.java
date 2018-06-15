

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.io.File;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.FileOutputStream;


/**
 * Servlet implementation class FullTextSearch
 */
@WebServlet("/FullTextSearch")
public class FullTextSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FullTextSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String loginUser = "root";
        String loginPasswd = "";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";
		
		String contextPath = getServletContext().getRealPath("/");

		String xmlFilePath=contextPath+"/query_measurements.txt";
		
		FileWriter fileWriter = new FileWriter(xmlFilePath, true);
		
		BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
		
		PrintWriter writer = new PrintWriter(bufferedWriter);

//		file.createNewFile();
		
		System.out.println("Absolute Path: " + xmlFilePath);
//		System.out.println("Canonical Path: " + file.getCanonicalPath());
//		System.out.println("Path: " + file.getPath());
		
		
//		PrintWriter writer = new PrintWriter(new FileOutputStream(xmlFilePath), true);
		
		long TJstartTime;
		long TJendTime;
		long TJelapsedTime;
		
		long TSstartTime;
		long TSendTime;
		long TSelapsedTime;
		
		// Time an event in a program to nanosecond precision
        TSstartTime = System.nanoTime();
		
		
        
        response.setContentType("application/json"); // Response mime type
        
        PrintWriter out = response.getWriter();
		
		JsonObject searchTerms = new JsonObject();
		
		String queryString = request.getQueryString();
		
		// Split queryString by &
		if (queryString != "") {
			String[] keyValues = queryString.split("&");
			
			List<String> keyValuesList = new ArrayList<String>(Arrays.asList(keyValues));
			
			for (int i = 0; i < keyValuesList.size(); ++i) {
				// For each element, split by = to get key-value pair
				String[] kv = keyValues[i].split("=");
				String key = kv[0];
				String value = kv[1];
				value = java.net.URLDecoder.decode(value, "UTF-8");
				searchTerms.addProperty(key, value);
				
			}
		}
		
		JsonElement type = searchTerms.get("type");
		JsonElement searchInput = searchTerms.get("query");
		
		String[] titleStringSplit = searchInput.getAsString().split("\\+");
		System.out.println(searchInput.getAsString());
		
		for (int i = 0; i < titleStringSplit.length; i++) {
			titleStringSplit[i] = "+" + titleStringSplit[i] + "*";
			System.out.println(titleStringSplit[i]);
		}
		
		String matchString = String.join(" ", titleStringSplit);
		
		System.out.println(matchString);
		
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
            
			// the following few lines are for connection pooling
            // Obtain our environment naming context

//            Context initCtx = new InitialContext();
//            if (initCtx == null)
//                out.println("initCtx is NULL");
//
//            Context envCtx = (Context) initCtx.lookup("java:comp/env");
//            if (envCtx == null)
//                out.println("envCtx is NULL");
//            
//            // Look up our data source
//            DataSource ds = (DataSource) envCtx.lookup("jdbc/ReadDB");
//            
//            if (ds == null)
//                out.println("ds is null.");
//            
           
//
//            Connection dbcon = ds.getConnection();
//            if (dbcon == null)
//                out.println("dbcon is null.");
            
         // Time an event in a program to nanosecond precision
            TJstartTime = System.nanoTime();
            
            
            
            if (type.getAsString().equals("movie")) {
	        		String searchQuery = "SELECT * FROM movies JOIN ratings ON movies.id = ratings.movieId";
	        		searchQuery = "SELECT * FROM (" + searchQuery + ") AS alias WHERE MATCH(title) AGAINST (? IN BOOLEAN MODE)";
	        		
	        		System.out.println(searchQuery);
	        		
	        		PreparedStatement search_pst = dbcon.prepareStatement(searchQuery);
	        		
	        		search_pst.setString(1, matchString);
	        		
	            ResultSet rs = search_pst.executeQuery();
	            
	            JsonArray moviesArray = new JsonArray();
	            
	            while (rs.next()) {
	            		JsonObject movie = new JsonObject();
	            		
	                String m_id = rs.getString("id");
	                String m_title = rs.getString("title");
	                String m_year = rs.getString("year");
	                String m_director = rs.getString("director");
	                String m_rating = rs.getString("rating");
	                String m_votes = rs.getString("numVotes");
	                
//	                String stars_query = "SELECT name FROM (SELECT starId FROM stars_in_movies WHERE stars_in_movies.movieId = \"" + m_id + "\") AS starIds JOIN stars ON starIds.starId = stars.id";
//	                String genres_query = "SELECT name FROM (SELECT genreId FROM genres_in_movies WHERE genres_in_movies.movieId = \"" + m_id + "\") AS genreIds JOIN genres ON genreIds.genreId = genres.id";

	                String stars_query = "SELECT name FROM (SELECT starId FROM stars_in_movies WHERE stars_in_movies.movieId = ?) AS starIds JOIN stars ON starIds.starId = stars.id";
	                String genres_query = "SELECT name FROM (SELECT genreId FROM genres_in_movies WHERE genres_in_movies.movieId = ?) AS genreIds JOIN genres ON genreIds.genreId = genres.id";
	                
	             
	                PreparedStatement stars_pst = dbcon.prepareStatement(stars_query);
	                stars_pst.setString(1, m_id);
	                
	                PreparedStatement genres_pst = dbcon.prepareStatement(genres_query);
	                genres_pst.setString(1, m_id);
	                
	                // Parts to be measured
	                ResultSet rs_stars = stars_pst.executeQuery();
	                ResultSet rs_genres = genres_pst.executeQuery();
	                
	                
	                String m_stars = "";
	                String m_genres = "";
	                
	                while (rs_stars.next()) {
		                	String star_name = rs_stars.getString("name");
		                	m_stars += star_name + ", ";    	
	                }
	    
	                
	                while (rs_genres.next()) {
		                	String genre_name = rs_genres.getString("name");
		                	m_genres += genre_name + ", ";
	                }
	                
	                m_stars = m_stars.trim();
	                m_stars = m_stars.substring(0, m_stars.length() - 1);
	                m_genres = m_genres.trim();
	                m_genres = m_genres.substring(0, m_genres.length() - 1);
	                
	                movie.addProperty("id", m_id);
	                movie.addProperty("title", m_title);
	                movie.addProperty("year", m_year);
	                movie.addProperty("director", m_director);
	                movie.addProperty("genres", m_genres);
	                movie.addProperty("stars", m_stars);
	                movie.addProperty("rating", m_rating);
	                movie.addProperty("votes", m_votes);
	                
	                moviesArray.add(movie);
	         
	                rs_stars.close();
	                rs_genres.close();
	                
	                stars_pst.close();
	                genres_pst.close();
	                
	            }
	            out.write(moviesArray.toString());
	            
	            
	            rs.close();
	            search_pst.close();
            }
            else {
//            		String searchQuery = "SELECT * FROM stars AS alias WHERE MATCH(name) AGAINST ('" + matchString +"' IN BOOLEAN MODE)";
            		
            		String searchStarsQuery = "SELECT * FROM stars AS alias WHERE MATCH(name) AGAINST (? IN BOOLEAN MODE)";
            		
            		PreparedStatement search_pst = dbcon.prepareStatement(searchStarsQuery);
            		search_pst.setString(1, matchString);
            		
            	    ResultSet rs = search_pst.executeQuery();
            	    
            	    JsonArray starsArray = new JsonArray();
            	    
            	    while (rs.next()) {
            	    		JsonObject starInfo = new JsonObject();
            	    	
            	    		String name = rs.getString("name");
            	    		String birthYear = rs.getString("birthYear");
            	    		starInfo.addProperty("name", name);
            	    		starInfo.addProperty("birthYear", birthYear);
            	    		
            	    		starsArray.add(starInfo);
            	    }
            	    
            	    out.write(starsArray.toString());
                
            	    rs.close();
            	    search_pst.close();
            }
            
            dbcon.close();
            
            // End time of the event in a program
            TJendTime = System.nanoTime();
            TJelapsedTime = TJendTime - TJstartTime; // elapsed time in nano seconds. Note: print the values in nano seconds
            
            // End time of the event in a program
            TSendTime = System.nanoTime();
            TSelapsedTime = TSendTime - TSstartTime; // elapsed time in nano seconds. Note: print the values in nano seconds
         
            System.out.println(TSelapsedTime + ";" + TJelapsedTime);
            
            writer.println(TSelapsedTime + ";" + TJelapsedTime);
            
            writer.close();
			
		} catch (SQLException ex) {
            while (ex != null) {
                System.out.println("SQL Exception:  " + ex.getMessage());
                ex = ex.getNextException();
            } // end while
        } // end catch SQLException
        catch (java.lang.Exception ex) {
            out.println("<HTML>" + "<HEAD><TITLE>" + "MovieDB: Error" + "</TITLE></HEAD>\n<BODY>"
                    + "<P>SQL error in doGet: " + ex.getMessage() + "</P></BODY></HTML>");
            return;
        }
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
