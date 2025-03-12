import pandas as pd

# Load the dataset
df = pd.read_csv("socialMedia.csv")

# Convert "Likes" column to numeric
df["Likes"] = pd.to_numeric(df["Likes"], errors="coerce")

# Convert "Date" column to datetime format
df["Date"] = pd.to_datetime(df["Date"])

# Extract day of the week and format the date as "M/D/YYYY (Weekday)"
df["FormattedDate"] = df["Date"].dt.strftime("%-m/%-d/%Y") + " (" + df["Date"].dt.day_name() + ")"

# Group by formatted date and calculate the average Likes
df_avg = df.groupby("FormattedDate")["Likes"].mean().reset_index()

# Rename column to match required format
df_avg.rename(columns={"FormattedDate": "Date", "Likes": "AvgLikes"}, inplace=True)

# Round AvgLikes to 3 decimal places
df_avg["AvgLikes"] = df_avg["AvgLikes"].round(3)

# Save to CSV
df_avg.to_csv("SocialMediaTime.csv", index=False)
