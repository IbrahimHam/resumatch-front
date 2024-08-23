import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: "#065F46",
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: "#047857",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});

const PDFTemplateTwo = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View>
          <Text style={styles.header}>{data.name}</Text>
          <Text style={styles.subHeader}>{data.title}</Text>
        </View>
        <View>
          <Text style={styles.text}>{data.contactInfo.email}</Text>
          <Text style={styles.text}>{data.contactInfo.phone}</Text>
          <Text style={styles.text}>{data.contactInfo.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Profil</Text>
        <Text style={styles.text}>{data.summary}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={[styles.section, { width: "60%" }]}>
          <Text style={styles.subHeader}>Berufserfahrung</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={[styles.text, styles.bold]}>{exp.jobTitle}</Text>
              <Text style={styles.text}>{exp.company}</Text>
              <Text style={styles.text}>
                {exp.startDate} - {exp.endDate}
              </Text>
              <Text style={styles.text}>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { width: "40%" }]}>
          <Text style={styles.subHeader}>Bildung</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={[styles.text, styles.bold]}>{edu.institution}</Text>
              <Text style={styles.text}>{edu.degree}</Text>
              <Text style={styles.text}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
          ))}

          <Text style={[styles.subHeader, { marginTop: 20 }]}>Sprachen</Text>
          {data.languages.map((lang, index) => (
            <Text key={index} style={styles.text}>
              {lang}
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFTemplateTwo;
