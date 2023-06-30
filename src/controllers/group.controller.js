import Group from '../models/Group';
import Users from '../models/Users'; 
import mongoose from 'mongoose';
import 'cookie-parser';

//controladores de la interface de CRUD

export function renderAddGroup(req, res){
    const userId = req.params.id;
    res.render('group', {userId: userId});
}

export async function addGroupHandler (req, res){
    //actualizar en la coleccion original e insertar a la coleccion del usuario que guarde los grupos en home, hacer
    //validators para dicha funcion, verficar que no se repitan las clases
    const {grade, group, career} = req.body;

    let groupId = await Group.findOne({grade: grade, group: group, career: career}, '_id');
    groupId = groupId._id.valueOf();

    const existingGroups = await Users.findById(req.params.id, 'groups');
    //console.log(existingGroups.groups);
    
    async function saveG() {
        const groupSaved = await Users.findByIdAndUpdate(req.params.id, {$push: {groups: groupId}});
        groupSaved.save();

        res.redirect('/home');
    }
    try {
        const errors = [];
        if (!grade) {
            errors.push({text: "Insert the grade"});
        }
        if (!group) {
            errors.push({text: "Insert the grade"});
        }
        if (!career) {
            errors.push({text: "Insert the career"});
        }
        if(existingGroups.groups.includes(groupId)){
            errors.push({text: "you have already added"});
        }
        if (errors.length > 0) {
            res.render('group', {errors, grade, group, career, userId: req.params.id});
        } else {
            saveG();
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function studentList(req, res) {
  //hay que agragar un $match al inicio pasandole el id proveniente de home
  console.log('parametro', req.params.groupName.charAt(0));
  console.log('parametro', req.params.groupName.charAt(2));
  console.log('parametro', req.params.groupName.substr(3));
  //console.log('llegó aqui?');
  let query = await Group.aggregate([
      {$match: {grade: req.params.groupName.charAt(0), group: req.params.groupName.charAt(2), career: req.params.groupName.substr(3)}},
      {$unwind: '$students'},
      {$project: {_id: "$students._id", name: '$students.name', grade: '$students.subject_grade',  status: '$students.status'}},
      {$sort: {name: 1}}
  ]);
  query.forEach(element => element.groupName = req.params.groupName);
  //query.groupName = req.params.groupName;
  for (let i = 0; i < query.length; i++) {
      if (query[i].grade == null){
          query[i].grade = "--";
      }
  }
  if(req.cookies.status){
      if(req.cookies.status == 'success-student'){
          res.clearCookie('status')
          res.render('crud', {document: query, groupName: req.params.groupName, success: "the student has successfully added to the list"});
      }
  } else{
      console.log('document', query);
      res.render('crud', {document: query, groupName: req.params.groupName});
  }
}

export async function addStudentHandler(req, res) {
  console.log('parrrrrammmmetrossssss', req.body);
  const errors = [];
  if (req.body.name == 0) {
      errors.push({text: 'Please insert a name'});
  }
  /*if (req.body.grade.length == 0){
      errors.push({text: 'Please insert a grade'});
  }*/
  if (req.body.subeject_grade < 0 || req.body.subeject_grade > 10) {
      errors.push({text: 'Grade must be between 0 and 10'});
  }
  if (errors.length > 0){
      try {
          let query = await Group.aggregate([
              {$match: {grade: req.params.groupName.charAt(0), group: req.params.groupName.charAt(2), career: req.params.groupName.substr(3)}},
              {$unwind: '$students'},
              {$project: {_id: "$students._id", name: '$students.name', grade: '$students.subject_grade',  status: '$students.status'}},
              {$sort: {name: 1}}
          ]);
          query.forEach(element => element.groupName = req.params.groupName);
          for (let i = 0; i < query.length; i++) {
              if (query[i].grade == null){
                  query[i].grade = "--";
              }
          }
          res.render('crud', {document: query, groupName: req.params.groupName,errors, object: req.body});
      } catch (error) {
          console.log(error.message);
      }
  } else {
      try{
          if(req.body.status == 'on'){
              req.body.status = true;
          } else{
              req.body.status = false;
          }

          await Group.updateOne(
              {grade: req.params.groupName.charAt(0), group: req.params.groupName.charAt(2), career: req.params.groupName.substr(3)},
              {$push: {students: {
                  name: req.body.name,
                  subject_grade: req.body.subeject_grade,
                  status: req.body.status
              }}}
          );
          res.cookie('status', 'success-student');
          const route = '/' + req.params.groupName + '/students/CRUD';
          console.log(route);
          res.redirect(route);
      } catch (error){
          console.log(error);
      }
  }
}

export async function deleteStudentHandler(req, res){
  const stdnId = mongoose.Types.ObjectId(req.params.id);
  await Group.updateOne({
      grade: req.params.groupName.charAt(0),
      group: req.params.groupName.charAt(2),
      career: req.params.groupName.substr(3),
  },{
      $pull: {
          students: {_id: stdnId}
      }
  });
  const route = '/' + req.params.groupName + '/students/CRUD';
  res.redirect(route);
}

//controladores de la interface de edit

export async function editStudentRender(req, res){
  try {
      //const stdnId = req.params.id;
      const stdnId = mongoose.Types.ObjectId(req.params.id);
      let object = await Group.aggregate([
          {$match: {grade: req.params.groupName.charAt(0), group: req.params.groupName.charAt(2), career: req.params.groupName.substr(3)}},
          {$unwind: '$students'},
          {$match: {"students._id": stdnId}},
          {$project: {_id: "$students._id", name: "$students.name", subject_grade: "$students.subject_grade", status: "$students.status"}}
      ]);
      object = object[0];
      console.log('objjjetooo-', object);
      console.log(typeof object.status, object.status);

      res.render('edit', {object, groupName: req.params.groupName});
  } catch (error) {
      console.log(error.message);
  }
}

export async function editStudentHandler (req, res){
  const errors = [];
  console.log(typeof req.body.status);
  console.log(req.body.status);
  if (req.body.name.length == 0) {
      errors.push({text: 'Please insert a name'});
  }
  if (req.body.subject_grade < 0 || req.body.subject_grade > 10) {
      errors.push({text: 'Grade must be between 0 and 10'});
  }
  if(req.body.status == 'on' || req.body.status == 'true' || req.body.status == 'True' || req.body.status == true){
      req.body.status = true;
  } else{
      req.body.status = false;
  }
  if (errors.length > 0){
      try {
          //const stdnId = req.params.id;
          const stdnId = mongoose.Types.ObjectId(req.params.id);
          let object = await Group.aggregate([
              {$match: {grade: req.params.groupName.charAt(0), group: req.params.groupName.charAt(2), career: req.params.groupName.substr(3)}},
              {$unwind: '$students'},
              {$match: {"students._id": stdnId}},
              {$project: {_id: "$students._id", name: "$students.name", subject_grade: "$students.subject_grade", status: "$students.status"}}
          ]);
          object = object[0];
          console.log('objjjetooo-', object);
          console.log(typeof object.status, object.status);
  
          res.render('edit', {object, groupName: req.params.groupName, errors: errors});
      } catch (error) {
          console.log(error.message);
      }
  } else {
      console.log(req.params.id);
      const stdnId = mongoose.Types.ObjectId(req.params.id);
      await Group.updateOne(
          {grade: req.params.groupName.charAt(0), group: req.params.groupName.charAt(2), career: req.params.groupName.substr(3), "students._id": stdnId},
          {$set: {"students.$": {
              name: req.body.name,
              subject_grade: req.body.subject_grade,
              status: req.body.status
          }}}
      );
      const route = '/' + req.params.groupName + '/students/CRUD';
      res.redirect(route);
  }
}