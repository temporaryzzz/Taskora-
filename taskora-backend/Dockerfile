FROM maven:latest AS build

WORKDIR /app
COPY pom.xml /app
RUN mvn dependency:go-offline

COPY . /app
RUN mvn clean package -DskipTests -B


FROM openjdk:21-jdk-slim

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]