FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# ✅ Make the Gradle wrapper executable
RUN chmod +x gradlew

## ✅ Build the app
#RUN ./gradlew build --no-daemon

# ✅ Copy the built JAR
COPY build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
