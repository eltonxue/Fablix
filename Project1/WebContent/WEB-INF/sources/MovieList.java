
/* A servlet to display the contents of the MySQL movieDB database */

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MovieList extends HttpServlet {
    public String getServletInfo() {
        return "Servlet connects to MySQL database and displays result of a SELECT";
    }

    // Use http GET

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String loginUser = "root";
        String loginPasswd = "cs122bfablix";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";

        response.setContentType("text/html"); // Response mime type

        // Output stream to STDOUT
        PrintWriter out = response.getWriter();

        out.println("<HTML><HEAD><TITLE>Fablix</TITLE></HEAD>");
        out.println("<BODY><H1>Movie List</H1>");

        try {
            //Class.forName("org.gjt.mm.mysql.Driver");
            Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
            // Declare our statement
            Statement statement = dbcon.createStatement();
            
            String query = "SELECT * FROM movies JOIN ratings ON movies.id = ratings.movieId ORDER BY rating DESC LIMIT 20";
            
            // Perform the query
            ResultSet rs = statement.executeQuery(query);
   

            out.println("<TABLE border>");
            
            out.println("<tr><td>Movie ID</td><td>Title</td><td>Year</td><td>Director</td><td>Ratings</td><td>Stars</td><td>Genres</td></tr>");

            // Iterate through each row of rs
            while (rs.next()) {
                String m_id = rs.getString("id");
                String m_title = rs.getString("title");
                String m_year = rs.getString("year");
                String m_director = rs.getString("director");
                String m_rating = rs.getString("rating");
                
                String stars_query = "SELECT name FROM (SELECT starId FROM stars_in_movies WHERE stars_in_movies.movieId = \"" + m_id + "\") AS starIds JOIN stars ON starIds.starId = stars.id";
                String genres_query = "SELECT name FROM (SELECT genreId FROM genres_in_movies WHERE genres_in_movies.movieId = \"" + m_id + "\") AS genreIds JOIN genres ON genreIds.genreId = genres.id";
                
                Statement stars_statement = dbcon.createStatement();
                Statement genres_statement = dbcon.createStatement();
                
                ResultSet rs_stars = stars_statement.executeQuery(stars_query);
                ResultSet rs_genres = genres_statement.executeQuery(genres_query);
                
                System.out.println(stars_query);
                
                String star_list = "";
                String genre_list = "";
                
                while (rs_stars.next()) {
	                	String star_name = rs_stars.getString("name");
	                	star_list = star_list + star_name + ", ";    	
                }
    
                
                while (rs_genres.next()) {
	                	String genre_name = rs_genres.getString("name");
	                	genre_list = genre_list + genre_name + ", ";
                }
              
                
                star_list = star_list.trim();
                star_list = star_list.substring(0, star_list.length() - 1);
                genre_list = genre_list.trim();
                genre_list = genre_list.substring(0, genre_list.length() - 1);
                
                out.println("<tr>" + 
                "<td>" + m_id + "</td>" + "<td>" + m_title + "</td>" + "<td>" + m_year + "</td>" + "<td>" 
                + m_director + "</td>" + "<td>" + m_rating + "</td>" 
                 + "<td>" + star_list + "</td>" + "<td>" + genre_list + "</td>" + "</tr>");
                
                rs_stars.close();
                rs_genres.close();
                
                stars_statement.close();
                genres_statement.close();
                
            }

            out.println("</TABLE>");

            rs.close();
            statement.close();
            dbcon.close();
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
        out.close();
    }
}
