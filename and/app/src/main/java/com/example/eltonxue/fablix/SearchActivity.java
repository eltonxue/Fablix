package com.example.eltonxue.fablix;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.Button;

import android.view.View.OnClickListener;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;


public class SearchActivity extends AppCompatActivity {

    // UI references.
    private AutoCompleteTextView mSearchInputView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        mSearchInputView = (AutoCompleteTextView) findViewById(R.id.searchInput);
        Button mSearchButton = (Button) findViewById(R.id.searchButton);

        mSearchButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptSearch();
            }
        });
    }

    private void attemptSearch() {

        // Reset errors
        mSearchInputView.setError(null);

        View focusView = null;

        // Store values at the time of the login attempt.
        final String input = mSearchInputView.getText().toString();
        Log.d("SEARCH INPUT: ", input);

        if (TextUtils.isEmpty(input)) {
            mSearchInputView.setError("This field is required");
            focusView = mSearchInputView;
        }
        else {
            // Make GET call and switch activities


            try {
            RequestQueue queue = Volley.newRequestQueue(this);

            String searchInput = URLEncoder.encode(input, "UTF-8");

            Log.d("UTF-8 Input: ", searchInput);

            String searchQuery = searchInput.replace("+", "%2B");

            Log.d("UTF-8 Query: ", searchQuery);

            final Context context = this;
            String url = "http://54.176.223.140:8080/Project1/FullTextSearch?type=movie&query=" + searchQuery;

            Log.d("UTF-8 URL: ", url);

            StringRequest getRequest = new StringRequest(Request.Method.GET, url,
                    new Response.Listener<String>()
                    {
                        @Override
                        public void onResponse(String res) {

                            try {
                                JSONArray response = new JSONArray(res);

//                                Log.d("Response from Search POST call: ", response.toString());

                                Intent intent = new Intent(SearchActivity.this, MovieListActivity.class);

                                intent.putExtra("MovieList", res);

                                startActivity(intent);
                            }
                            catch (JSONException err) {
                                Log.d("Failed Response from Search POST call: ", err.toString());
                            }


                        }
                    },
                    new Response.ErrorListener()
                    {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // error
                            Log.d("Error from Search POST call:", error.toString());
                        }
                    }
            ) {};

            getRequest.setShouldCache(false);
            queue.add(getRequest);

            }
            catch (UnsupportedEncodingException exception) {
                Log.d("Error: ", exception.toString());
            }


        }

    }
}
