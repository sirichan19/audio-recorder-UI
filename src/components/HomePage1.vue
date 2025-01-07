<template>
    <div class="home">
        <h1>Welcome to the my page</h1>

        <div class="projects">
            <h2> Projects </h2>
            <div v-for="(project, index) in projects" :key="index" id="card">
                <b>Name:</b><i>{{ project.name }} </i> 
                 <br />
                <b>Project Description: </b><i> {{ project.description }} </i>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'HomePage1',
    data() {
        return {
            projects: [
                { name: "Wine Preferences", description: "This project will update the wine preferences set by the customer. It used API's to fetch and update the preferences and uses dynamoDB to store the saved preferences" },
                { name: "Customer API", description: "This project writes customer data to commerce tools by using AWS API's and lambda's " }
            ],
        };
    },
};
</script>

<style>
#card {
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 8px; /* Rounded corners */
  padding: 16px; /* Add some space inside the card */
  margin: 16px auto; /* Space between cards and center alignment */
  width: 90%; /* Adjust width of the card */
  max-width: 400px; /* Limit maximum width for better appearance */
  background-color: #f9f9f9; /* Subtle background color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Smooth hover effects */
}

/* Add hover effect for better interaction */
#card:hover {
  transform: scale(1.02); /* Slightly enlarge the card */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Deeper shadow on hover */
}

/* Style the text for better readability */
#card p {
  margin: 8px 0; /* Space between lines of text */
  font-family: Arial, sans-serif; /* Clean and readable font */
  font-size: 16px; /* Standard text size */
  color: #333; /* Dark gray text color */
}
</style>