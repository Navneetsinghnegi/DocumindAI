# Use a lightweight Python version
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file first (for better caching)
COPY requirements.txt .

# Install dependencies
# We add --no-cache-dir to keep the image small
RUN pip install --no-cache-dir -r requirements.txt

# Copy all your code into the container
COPY . .

# Give permission to execute the start script
RUN chmod +x start.sh

# Create a directory for vector storage to avoid permission errors
RUN mkdir -p vector_stores && chmod 777 vector_stores

# Expose the port Hugging Face expects
EXPOSE 7860

# Run the start script
CMD ["./start.sh"]