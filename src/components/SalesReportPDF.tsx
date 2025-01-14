import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: '40 20',
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 16,
    marginBottom: 4,
  },
  period: {
    fontSize: 10,
    color: '#666',
    marginBottom: 20,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#8B0000',
    padding: '8 10',
    color: 'white',
    marginBottom: 10,
  },
  tableHeaderCell: {
    fontSize: 12,
  },
  menuCell: {
    width: '50%',
  },
  quantityCell: {
    width: '25%',
  },
  priceCell: {
    width: '25%',
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    fontSize: 11,
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  total: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

interface SalesReportPDFProps {
  reportData: {
    menu_name: string;
    quantity: number;
    total_price: number;
  }[];
  totalPrice: number;
  period?: string;
}

const SalesReportPDF: React.FC<SalesReportPDFProps> = ({ reportData, totalPrice, period = '1 Januari - 1 Februari' }) => {
  if (!reportData || reportData.length === 0) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No sales data available.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Laporan Penjualan</Text>
        <Text style={styles.header}>Baso Krijo</Text>
        <Text style={styles.period}>Periode Penjualan: {period}</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.menuCell}>
              <Text style={styles.tableHeaderCell}>Menu</Text>
            </View>
            <View style={styles.quantityCell}>
              <Text style={styles.tableHeaderCell}>Jumlah</Text>
            </View>
            <View style={styles.priceCell}>
              <Text style={styles.tableHeaderCell}>Harga</Text>
            </View>
          </View>

          {reportData.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.menuCell}>
                <Text style={styles.tableCell}>{item.menu_name}</Text>
              </View>
              <View style={styles.quantityCell}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.priceCell}>
                <Text style={styles.tableCell}>
                  Rp {item.total_price.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.total}>
            Total: Rp {totalPrice.toLocaleString('id-ID')}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SalesReportPDF;
