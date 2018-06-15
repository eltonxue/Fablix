

import java.io.IOException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonArray;

import java.sql.PreparedStatement;

/**
 * Servlet implementation class Search
 */
@WebServlet("/Search")
public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Search() {
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
		
		// Search through database with queries
		
		JsonElement year = searchTerms.get("year");
		JsonElement title = searchTerms.get("title");
		JsonElement director = searchTerms.get("director");
		JsonElement star = searchTerms.get("star"); 
		JsonElement genre = searchTerms.get("genre");
		JsonElement startWith = searchTerms.get("startWith");
		
		try {
			Class.forName("org.gjt.mm.mysql.Driver");
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
//            Connection dbcon = ds.getConnection();
//            if (dbcon == null)
//                out.println("dbcon is null.");

             

            
            // Check if email exists
            String searchQuery = "SELECT * FROM movies JOIN ratings ON movies.id = ratings.movieId";
            
            if (year != null) {
            		String yearString = year.getAsString();
            		searchQuery = "SELECT * FROM (" + searchQuery + ") AS alias WHERE year = '" + yearString + "'";
            }
            
            if (title != null) {
            		String[] titleStringSplit = title.getAsString().split("\\+");
            		String titleString = String.join(" ", titleStringSplit);
            		searchQuery = "SELECT * FROM (" + searchQuery + ") AS alias WHERE title LIKE '%" + titleString + "%'";
            		
            		// SELECT * FROM movies WHERE title LIKE '%david%';
            }
            
            if (director != null) {
	        		String[] directorStringSplit = director.getAsString().split("\\+");
	        		String directorString = String.join(" ", directorStringSplit);
	        		searchQuery = "SELECT * FROM (" + searchQuery + ") AS alias WHERE director LIKE '%" + directorString + "%'";
	        		// SELECT * FROM movies WHERE director LIKE '%david%';
	        		
	        }
            
            if (star != null) {
            		String[] starStringSplit = star.getAsString().split("\\+");
        			String starString = String.join(" ", starStringSplit);
	        		searchQuery = "SELECT * FROM (" + searchQuery + ") AS alias JOIN (SELECT movieId AS movieIdStars FROM stars_in_movies JOIN (SELECT id FROM stars WHERE name LIKE '%" + starString + "%') AS movieIds ON stars_in_movies.starId = movieIds.id) AS movieIds ON alias.id = movieIds.movieIdStars";
	        		
	        		/* 
	        		 SELECT * FROM movies JOIN
				  (
				  SELECT movieId FROM stars_in_movies JOIN
				  (SELECT id FROM stars WHERE name LIKE '%middleton%') AS movieIds
				    ON stars_in_movies.starId = movieIds.id
				  ) AS movieIds ON movies.id = movieIds.movieId;
				 */
	        }
            
            if (genre != null) {
	            	String[] genreStringSplit = genre.getAsString().split("\\+");
	    			String genreString = String.join(" ", genreStringSplit);
	    			
	        		searchQuery = "SELECT * FROM (" + searchQuery + ") AS alias JOIN (SELECT movieId AS movieIdGenres FROM genres_in_movies JOIN (SELECT id FROM genres WHERE name LIKE '%" + genreString + "%') AS movieIds ON genres_in_movies.genreId = movieIds.id) AS movieIds ON alias.id = movieIds.movieIdGenres";
	        		
            }
            
            if (startWith != null) {
	            	String[] startWithStringSplit = startWith.getAsString().split("\\+");
	        		String startWithString = String.join(" ", startWithStringSplit);
	        		searchQuery = "SELECT * FROM (" + searchQuery + ") AS alias WHERE title LIKE '" + startWithString + "%'";
            }
            
            Statement statement = dbcon.createStatement();
            ResultSet rs = statement.executeQuery(searchQuery);
            
            JsonArray moviesArray = new JsonArray();
            
            while (rs.next()) {
            		JsonObject movie = new JsonObject();
            		
                String m_id = rs.getString("id");
                String m_title = rs.getString("title");
                String m_year = rs.getString("year");
                String m_director = rs.getString("director");
                String m_rating = rs.getString("rating");
                String m_votes = rs.getString("numVotes");
                
                String stars_query = "SELECT name FROM (SELECT starId FROM stars_in_movies WHERE stars_in_movies.movieId = \"" + m_id + "\") AS starIds JOIN stars ON starIds.starId = stars.id";
                String genres_query = "SELECT name FROM (SELECT genreId FROM genres_in_movies WHERE genres_in_movies.movieId = \"" + m_id + "\") AS genreIds JOIN genres ON genreIds.genreId = genres.id";
                
                Statement stars_statement = dbcon.createStatement();
                Statement genres_statement = dbcon.createStatement();
                
                ResultSet rs_stars = stars_statement.executeQuery(stars_query);
                ResultSet rs_genres = genres_statement.executeQuery(genres_query);
                
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
                
                stars_statement.close();
                genres_statement.close();
                
            }
            out.write(moviesArray.toString());
            
            rs.close();
            statement.close();
            dbcon.close();
        } catch (SQLException ex) {
        		ex.printStackTrace();
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
        out.close();
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
