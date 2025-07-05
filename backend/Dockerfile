FROM maven:latest AS build

WORKDIR /app
COPY pom.xml /app
RUN mvn:resolve

COPY . /app
RUN mvn clean package -DskipTests


FROM openjdk:17-alpine

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
