import React, { Component } from 'react';
import './Reports.css';

class LikePredicate extends Component {
  render() {
    return (
      <div className="report-container">
        <h1>LIKE Predicate Report</h1>
        <p>
          While constructing the java servlet routes for searching, we researched up on substring
          matching and decided to extensively use the LIKE predicate.
        </p>
        <p>
          More specifically, we first created a GET route "@/Search" and passed it a query string to
          be handled by the servlet. Then, we parsed the queries to get the title, director, star,
          and startWith so that we could create search queries inside our database. For each the
          title, director, and star, we used "LIKE %searchTerm%" to find all movie matches with the
          "searchTerm" as a substring. For the startWith term, we used "LIKE startWith%" to only get
          movies that START with that string.
        </p>
        <p>
          Another area that we used the LIKE predicate was when we created a GET route
          "@/SearchSingleStar". Similarly, we used query strings to pass data to the servlets.
          However, we only searched for stars and used "LIKE %star%" to get that single star
          information (such as the birthYear).
        </p>
      </div>
    );
  }
}

export default LikePredicate;
