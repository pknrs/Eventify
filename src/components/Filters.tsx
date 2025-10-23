import { CheckSquare, Tags } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from '../theme';

type Props = {
  ticketType: string | null;
  setTicketType: (v: string | null) => void;
  checkedIn: string | null;
  setCheckedIn: (v: string | null) => void;
};

// Options for the ticket type dropdowns
const ticketOptions = [
  { label: 'All', value: '' },
  { label: 'VIP', value: 'VIP' },
  { label: 'Regular', value: 'Regular' },
  { label: 'Staff', value: 'Staff' },
];

// Options for the checked-in dropdown
const checkedOptions = [
  { label: 'All', value: '' },
  { label: 'Checked in', value: 'true' },
  { label: 'Not checked in', value: 'false' },
];

const Filters = ({
  ticketType,
  setTicketType,
  checkedIn,
  setCheckedIn,
}: Props) => {
  const { theme } = useTheme();
  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <View style={styles.labelRow}>
          <Tags
            color={theme.text}
            width={14}
            height={14}
            style={styles.labelIcon}
          />
          <Text style={[styles.label, { color: theme.text }]}>Ticket type</Text>
        </View>
        {/* Ticket type dropdown */}
        <Dropdown
          style={[
            styles.dropdown,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
          data={ticketOptions}
          labelField="label"
          valueField="value"
          value={ticketType ?? ''}
          onChange={item => setTicketType(item.value || null)}
          placeholder="All"
          activeColor="#9f9fa9"
          placeholderStyle={{ color: theme.text }}
          selectedTextStyle={{ color: theme.text }}
        />
      </View>
      <View style={styles.col}>
        <View style={styles.labelRow}>
          <CheckSquare
            color={theme.text}
            width={14}
            height={14}
            style={styles.labelIcon}
          />
          <Text style={[styles.label, { color: theme.text }]}>Checked</Text>
        </View>
        {/* Checked-in dropdown */}
        <Dropdown
          style={[
            styles.dropdown,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
          data={checkedOptions}
          labelField="label"
          valueField="value"
          value={checkedIn ?? ''}
          onChange={item => setCheckedIn(item.value || null)}
          placeholder="All"
          activeColor="#9f9fa9"
          placeholderStyle={{ color: theme.text }}
          selectedTextStyle={{ color: theme.text }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  col: { flex: 1, marginHorizontal: 6 },
  dropdown: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  label: { marginBottom: 6 },
  labelRow: { flexDirection: 'row', alignItems: 'center' },
  labelIcon: { marginRight: 8 },
});

export default Filters;
