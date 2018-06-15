package com.example.eltonxue.fablix;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import java.util.ArrayList;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MovieListActivity extends AppCompatActivity {

    private ListView listview;
    private TextView title;
    private Button btn_prev;
    private Button btn_next;

    private ArrayList<String> data;
    ArrayAdapter<String> sd;

    private int pageCount ;

    private int increment = 0;

    public int TOTAL_LIST_ITEMS = 20;
    public int NUM_ITEMS_PAGE   = 5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movie_list);

        listview = (ListView)findViewById(R.id.list);
        btn_prev = (Button)findViewById(R.id.prev);
        btn_next = (Button)findViewById(R.id.next);
        title = (TextView)findViewById(R.id.title);

        btn_prev.setEnabled(false);

        Intent intent = getIntent();
        String movieListString = intent.getStringExtra("MovieList");

        Log.d("MoviesString: ", movieListString);

        try {
            JSONArray movieListData = new JSONArray(movieListString);

            TOTAL_LIST_ITEMS = movieListData.length();

            Log.d("Movies: ", movieListData.toString());

            data = new ArrayList<String>();

            int val = TOTAL_LIST_ITEMS%NUM_ITEMS_PAGE;
            val = val==0?0:1;
            pageCount = TOTAL_LIST_ITEMS/NUM_ITEMS_PAGE+val;

            for(int i=0;i<TOTAL_LIST_ITEMS;i++)
            {
                JSONObject movieData = new JSONObject(movieListData.get(i).toString());

                String title = movieData.getString("title");
                String year = movieData.getString("year");
                title = title + " (" + year + ")";
                String director = movieData.getString("director");
                String rating = movieData.getString("rating");

                String genres = movieData.getString("genres");
                String stars = movieData.getString("stars");

                String movie = String.format("%n%-25s %n%n%-25s %-25s %n%n%-25s %-25s %n%n%-25s %n%-50s %n%n%-25s %n%-50s%n", title, "Director:", director, "Rating:", rating, "Genres:", genres, "Stars:", stars);

                data.add(movie);
            }

            loadList(0);

            btn_next.setOnClickListener(new OnClickListener() {

                public void onClick(View v) {

                    increment++;
                    loadList(increment);
                    CheckEnable();
                }
            });

            btn_prev.setOnClickListener(new OnClickListener() {

                public void onClick(View v) {

                    increment--;
                    loadList(increment);
                    CheckEnable();
                }
            });

        }
        catch (JSONException exception) {
            Log.d("ERROR: ", exception.toString());
        }
    }

    /**
     * Method for enabling and disabling Buttons
     */
    private void CheckEnable()
    {
        if(increment == pageCount + 1)
        {
            btn_next.setEnabled(false);
        }
        else if(increment == 0)
        {
            btn_prev.setEnabled(false);
        }
        else
        {
            btn_prev.setEnabled(true);
            btn_next.setEnabled(true);
        }
    }

    /**
     * Method for loading data in listview
     * @param number
     */
    private void loadList(int number)
    {
        ArrayList<String> sort = new ArrayList<String>();
        title.setText("Page "+(number+1)+" of "+pageCount);

        int start = number * NUM_ITEMS_PAGE;
        for(int i=start;i<(start)+NUM_ITEMS_PAGE;i++)
        {
            if(i<data.size())
            {
                sort.add(data.get(i));
            }
            else
            {
                break;
            }
        }
        sd = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1,
                sort);
        listview.setAdapter(sd);
    }
}
