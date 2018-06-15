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

public class SAXStarParser extends DefaultHandler{

	Map<String, String> myStars;
	Set<String> genresSet = new HashSet<String>();
	
	JsonObject genres = new JsonObject();
	
	private String currentDir;
	private String currentMovieId;
	private String currentActor;
	private String currentYear;
	
	boolean inMap = false;
	boolean bDir = false;
	boolean bYear = false;
	boolean bId = false;
	boolean bTitle = false;
	boolean bCat = false;
	boolean bFilm = false;
	boolean bActor = false;
	
	//to maintain context
	
	
	public SAXStarParser(){
		myStars = new HashMap<String, String>();
		
	}
	
	public Map<String,String> getData() {
		parseDocument();
//		printData();
//		
//		System.out.println(myStars.size());
//		
		return myStars;
	}

	private void parseDocument() {
		
		//get a factory
		SAXParserFactory spf = SAXParserFactory.newInstance();
		try {
		
			//get a new instance of parser
			SAXParser sp = spf.newSAXParser();
			
			//parse the file and also register this class for call backs
			sp.parse("actors63.xml", this);
			
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
		
		System.out.println("No of Employees '" + myStars.size() + "'.");
		
		Iterator it = myStars.keySet().iterator();
		while(it.hasNext()) {
			String k = it.next().toString();
			System.out.println(k);
			System.out.println(myStars.get(k));

		}
//		System.out.println(genresSet);
//		System.out.println(genres);
	}
	

	//Event Handlers
	public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
		//reset
		if(qName.equalsIgnoreCase("stagename")) {
			bActor = true;
//			tempEmp.setType(attributes.getValue("type"));
		}
		else if (qName.equalsIgnoreCase("dob")) {
			bYear = true;
		}
	}
	

	public void characters(char[] ch, int start, int length) throws SAXException {	
		if (bActor) {
			currentActor = new String(ch,start,length);
			bActor = false;
		}
		else if (bYear) {
			currentYear = new String(ch, start, length);
			bYear = false;
		}
	}
	
	public void endElement(String uri, String localName, String qName) throws SAXException {

		if(qName.equalsIgnoreCase("actor")) {
			myStars.put(currentActor, currentYear);
			//add it to the list		
		}
		
		
	}
//	
//	public static void main(String[] args){
//		SAXStarParser spe = new SAXStarParser();
//		Map stars = spe.getData();
//		
//		System.out.println("Gordon Clapp dob");
//		System.out.println(stars.get("Johnny Yune"));
//		System.out.println(stars.size());
//	}
//	
}


