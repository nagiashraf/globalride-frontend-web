interface Resources {
  common: {
    header: {
      testing: "Testing...";
    };
    searchForm: {
      pickupLocationLabel: "Pickup Location";
      pickupLocationPlaceholder: "Enter country, city, airport, or branch name...";
      dropoffLocationLabel: "Drop-off Location";
      dropoffLocationPlaceholder: "Enter country, city, airport, or branch name...";
      locationNotFound: "No results found. Try a different branch.";
      pickupDateLabel: "Pickup Date";
      pickupDatePlaceholder: "Select a date";
      dropoffDateLabel: "Drop-off Date";
      dropoffDatePlaceholder: "Select a date";
      timeLabel: "Time";
      timePlaceholder: "Select a time";
      submitButton: "Find cars";
      returnToTheSameBranchCheckbox: "Return to the same branch";
      validation_pickupLocationRequired: "Pickup location is required";
      validation_pickupDateFuture: "Pickup date must be in the future";
      validation_dropoffDateFuture: "Drop-off date must be in the future";
      validation_dropoffDateAfterPickup: "Drop-off date must be after pickup date";
      validation_invalidDate: "Invalid date";
      validation_invalidTime: "Invalid time";
    };
    footer: {
      copyright: "Copyright © {{year}} GlobalRide. All rights reserved.";
      developerInfo: "This web app was developed by Nagi Ashraf, a .NET & React full-stack developer. You can reach out at: <1>{{email}}</1>";
    };
  };
  home: {
    hero: {
      title: "Rent a car and explore the world";
      subtitle: "Find the best deals on car rental and enjoy your trip with comfort and convenience.";
    };
    benefits: {
      title: "Why Rent With Us?";
      subtitle: "Top-rated car rental service trusted by travelers worldwide.";
      item1_headline: "Rent a Car Anywhere";
      item1_description: "With branches in over 50 countries, you're never far from a great rental experience.";
      item2_headline: "No Hidden Fees";
      item2_description: "Transparent pricing with no surprise charges. What you see is what you pay!";
      item3_headline: "Choose From 50+ Models";
      item3_description: "From economy to luxury, SUVs to electric cars—find the perfect ride.";
      item4_headline: "Book With Confidence";
      item4_description: "Modify or cancel your booking with ease. Full refunds available under flexible policies.";
      item5_headline: "24/7 Customer Assistance";
      item5_description: "Live chat and phone support available anytime, anywhere.";
      item6_headline: "Drive with Peace of Mind";
      item6_description: "Comprehensive insurance and sanitized vehicles for your safety.";
    };
    destinations: {
      title: "Discover Popular Destinations";
      subtitle: "Find the perfect car for your next adventure in top-rated locations worldwide.";
      city1: "Dubai";
      city2: "Cairo";
      city3: "New York";
      city4: "Rio de Janeiro";
      city5: "Barcelona";
      city6: "Paris";
      city7: "Rome";
      city8: "London";
      btnText: "book now";
    };
  };
  "not-found": {
    title: "Oops! This page got lost on the road...";
    description: "The page you're looking for doesn't exist or has been moved. But don't worry, we've got plenty of great cars for you to rent!";
    btnText: "Go Back Home";
  };
}

export default Resources;
