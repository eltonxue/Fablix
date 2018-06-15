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
import com.google.gson.JsonObject;

public class SAXCastParser extends DefaultHandler{

	Map<String,JsonObject> myMovies;
//	Map myStars;
	Set<String> genresSet = new HashSet<String>();
	
	JsonObject genres = new JsonObject();
	
	private String currentDir;
	private String currentMovieId;
	
	boolean inMap = false;
	boolean bDir = false;
	boolean bYear = false;
	boolean bId = false;
	boolean bTitle = false;
	boolean bCat = false;
	boolean bFilm = false;
	boolean bActor = false;
	
	//to maintain context
	private JsonObject tempMovie;
	private JsonArray genreArray;
	private JsonArray starArray;
	
	
	public SAXCastParser(){
		SAXMovieParser spe = new SAXMovieParser();
		myMovies = spe.getData();
//		myStars = new HashMap();
		
		genres.addProperty("actn","Action");
		genres.addProperty("dram","Drama");
		genres.addProperty("ctxx","Uncategorized");
		genres.addProperty("camp","Now-Camp");
		genres.addProperty("comd", "Comedy");
		genres.addProperty("disa","Disaster");
		genres.addProperty("actn","Action");
		genres.addProperty("epic", "Epic");
		genres.addProperty("horr","Horr");
		genres.addProperty("noir","Black");
		genres.addProperty("scfi","Sci-Fi");
		genres.addProperty("west", "Western");
		genres.addProperty("advt","Adventure");
		genres.addProperty("cart","Cartoon");
		genres.addProperty("docu","Documentary");
		genres.addProperty("faml","Family");
		genres.addProperty("musc","Musical");
		genres.addProperty("porn","Pornography");
		genres.addProperty("surl","Sureal");
		genres.addProperty("avga","Avante Garde");
		genres.addProperty("cnr","Cops and Robbers");
		genres.addProperty("hist","History");
		genres.addProperty("myst","Mystery");
		genres.addProperty("romt","Romantic");
		genres.addProperty("susp","Thiller");
		genres.addProperty("tv","TV show");
		genres.addProperty("tvs","TV series");
		genres.addProperty("tvm","TV miniseries");
		genres.addProperty("biop","Biographical Picture");
		genres.addProperty("s.f.","Sci-Fi");
		
	}
	
	public Map<String, JsonObject> getData() {
		parseDocument();
//		printData();
//		
//		System.out.println(myMovies.size());
		
		return myMovies;
	}

	private void parseDocument() {
		
		//get a factory
		SAXParserFactory spf = SAXParserFactory.newInstance();
		try {
		
			//get a new instance of parser
			SAXParser sp = spf.newSAXParser();
			
			//parse the file and also register this class for call backs
			sp.parse("casts124.xml", this);
			
		}catch(SAXException se) {
			se.printStackTrace();
		}catch(ParserConfigurationException pce) {
			pce.printStackTrace();
		}catch (IOException ie) {
			ie.printStackTrace();
		}
	}

	/**
	 * Iterate through the list and print
	 * the contents
	 */
	private void printData(){
		
		System.out.println("No of Employees '" + myMovies.size() + "'.");
		
		Iterator it = myMovies.keySet().iterator();
		while(it.hasNext()) {
			String k = it.next().toString();
			System.out.println(k);
			System.out.println(myMovies.get(k));
		}
//		System.out.println(genresSet);
//		System.out.println(genres);
	}
	

	//Event Handlers
	public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
		//reset
		if(qName.equalsIgnoreCase("f")) {
			genreArray = new JsonArray();
			bId = true;
//			tempEmp.setType(attributes.getValue("type"));
		}
		else if (qName.equalsIgnoreCase("filmc")) {
			starArray = new JsonArray();
		}
		else if (qName.equalsIgnoreCase("dirid")) {
			bDir = true;
		}
		
		else if (qName.equalsIgnoreCase("t") && !inMap) {
			bTitle = true;
		}
		else if (qName.equalsIgnoreCase("p") && !inMap) {
			bCat = true;
		}
		else if (qName.equalsIgnoreCase("a")) {
			bActor = true;
		}
		
	}
	

	public void characters(char[] ch, int start, int length) throws SAXException {
		
		if (bDir) {
			currentDir = new String(ch, start, length);

			bDir = false;
		}
		else if (bYear) {
			tempMovie.addProperty("year", new String(ch,start,length));
			bYear = false;
		}
		else if (bId) {
			currentMovieId = new String(ch, start, length);
			currentMovieId = currentMovieId.trim().toLowerCase();
			inMap = myMovies.get(currentMovieId) != null;

			if (!inMap) {
				tempMovie = new JsonObject();
			}
			
			bId = false;
		}
		else if (bTitle) {
//			tempMovie.addProperty("title", new String(ch,start, length));
//			bTitle = false;
			tempMovie.addProperty("title", new String(ch,start,length));
//			System.out.println(tempMovie);
			bTitle = false;
			
		}
		
		else if (bCat) {
			String cat = new String(ch,start,length);
			
			if (genres.has(cat.toLowerCase())) {
				genreArray.add(genres.get(cat.toLowerCase()).getAsString());
				genresSet.add(genres.get(cat.toLowerCase()).getAsString());
			}
			else {
				genreArray.add(new String(ch,start,length));
				genresSet.add(new String(ch,start,length));
			}
			
			bCat = false;
		}
		
		else if (bActor) {
			starArray.add(new String(ch,start, length));
			bActor = false;
		}
	}
	
	public void endElement(String uri, String localName, String qName) throws SAXException {

		if(qName.equalsIgnoreCase("f")) {
			
			if (!inMap) {
				tempMovie.addProperty("director", currentDir);
				tempMovie.add("genres", genreArray);
				tempMovie.add("year", null);
				myMovies.put(currentMovieId,tempMovie);
			}
			//add it to the list		
		}
		
		else if (qName.equalsIgnoreCase("filmc")) {
			JsonObject mov = myMovies.get(currentMovieId);
			mov.add("stars", starArray);
			
			myMovies.put(currentMovieId, mov);
		}
		
	}
	
	
}


