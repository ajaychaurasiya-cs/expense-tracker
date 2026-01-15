import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardUi from '../ui/CardUi';
import { useHistory } from '../context/UpdateHistory';
import { Colors } from '../colors/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function UpdateHistory() {
  const { editEnable, setEditEnable, setDeleteId, setOkEdit, setUseItemId } = useHistory();

  return (
    <View >
      {editEnable ? (
        ''
      ) : (
        <View style={styles.optionBtn}>
          <TouchableOpacity onPress={() => setUseItemId("false")}>
            <CardUi>
              <MaterialIcons
                          name="close"
                          size={35}
                          color={Colors.text}
                        />
              {/* <SubTitleUi>Edit</SubTitleUi> */}
            </CardUi>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditEnable(true)}>
            <CardUi>
              <MaterialIcons
                          name="edit"
                          size={35}
                          color={Colors.text}
                        />
              {/* <SubTitleUi>Edit</SubTitleUi> */}
            </CardUi>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setDeleteId(true)}>
            <CardUi>
              <MaterialIcons
                          name="delete"
                          size={35}
                          color={Colors.text}
                        />
              {/* <SubTitleUi>Delete</SubTitleUi> */}
            </CardUi>
          </TouchableOpacity>
        </View>
      )}

      {editEnable && <View style={styles.editBtn} >
        <TouchableOpacity onPress={() => setEditEnable(false)}>
          <CardUi>
          <Ionicons
            name="close-circle-sharp"
            size={35}
            color={Colors.text}
          />
          </CardUi>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOkEdit(true)}>
          <CardUi>
          <Ionicons
            name="checkmark-circle-sharp"
            size={35}
            color={Colors.text}
          />
          </CardUi>
        </TouchableOpacity>
      </View>}

    </View>
  );
}

export default UpdateHistory;

const styles = StyleSheet.create({
  optionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editBtn:{flexDirection:"row", justifyContent:"space-between", margin:10}
});
